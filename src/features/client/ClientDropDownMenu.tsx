import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { useState } from "react";
import { BsThreeDots, BsPencil, BsCarFrontFill, BsTrash } from "react-icons/bs";
import InputCarOverlay from "./InputCarOverlay";
import supabase from "../../api/supabase";
import WarningAlert from "../../components/WarningAlert";

type Props = {
  clientId: number;
};

export default function ClientDropdownMenu({ clientId }: Props) {
  const [isCarOverlayOpen, setIsCarOverlayopen] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: string,
  ) => {
    e.stopPropagation();
    console.log(`${action} klienta ${clientId}`);
  };

  const deleteHandle = async (clientId: number) => {
    try {
      const { error: vehicleDeleteError } = await supabase
        .from("Pojazdy")
        .delete()
        .eq("Klient_id", clientId);

      if (vehicleDeleteError) {
        throw new Error(
          `Błąd podczas usuwania pojazdów: ${vehicleDeleteError.message}`,
        );
      }

      const { error: clientDeleteError } = await supabase
        .from("Klienci")
        .delete()
        .eq("Klient_id", clientId);

      if (clientDeleteError) {
        throw new Error(
          `Błąd podczas usuwania klienta: ${clientDeleteError.message}`,
        );
      }
      console.log(
        `Klient o ID ${clientId} oraz jego pojazdy zostali pomyślnie usunięci.`,
      );
    } catch (err: any) {
      console.error("Wystąpił błąd:", err.message);
    }
    setWarningAlert(false);
  };

  return (
    <div className="relative w-fit" onClick={(e) => e.stopPropagation()}>
      <Menu>
        <MenuButton className="bg-highlight cursor-pointer rounded-2xl p-1 text-gray-500 hover:text-gray-400 hover:opacity-70">
          <BsThreeDots />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="text-text absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-xl border border-white/80 p-1 text-sm shadow-lg ring-1 ring-black/10 backdrop-blur-md focus:outline-none"
        >
          <MenuItem>
            <button
              onClick={(e) => handleClick(e, "Edytuj")}
              className="hover:bg-text/5 flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
            >
              <BsPencil className="text-text/80 size-4" />
              Edytuj
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setIsCarOverlayopen(!isCarOverlayOpen)}
              className="hover:bg-text/5 flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
            >
              <BsCarFrontFill className="text-text/80 size-4" />
              Dodaj Samochód
            </button>
          </MenuItem>
          <MenuSeparator className="bg-text/10 my-1 h-px" />

          <MenuItem>
            <button
              onClick={() => setWarningAlert(true)}
              className="hover:bg-text/5 flex w-full items-center gap-2 rounded-lg px-3 py-1.5"
            >
              <BsTrash className="text-text/80 size-4" />
              Usuń
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <InputCarOverlay
        isOpen={isCarOverlayOpen}
        onClose={() => setIsCarOverlayopen(false)}
        clientId={clientId}
      />
      <WarningAlert
        isOpen={warningAlert}
        onClose={() => setWarningAlert(false)}
        acceptRisk={() => deleteHandle(clientId)}
      />
    </div>
  );
}
