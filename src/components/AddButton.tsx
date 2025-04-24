import { MdOutlineTask } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import "./AddButton.css";
import InputClientOverlay from "../features/client/InputClientOverlay";
import { useState } from "react";

function AddButton() {
  const [isClientOverlayOpen, setIsClientOverlayOpen] = useState(false);
  const [isTasksOverlayOpen, setIsTasksOverlayOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton
          className={`bg-primary text-background absolute right-5 bottom-5 w-fit rounded-full p-2.5 pr-5 pl-5 text-4xl hover:cursor-pointer hover:opacity-90`}
        >
          +
        </MenuButton>
        <MenuItems
          className="bg-primary text-background flex w-64 origin-top flex-col items-start rounded-3xl p-2.5 transition duration-200 ease-out [--anchor-gap:8px] data-[closed]:scale-95 data-[closed]:opacity-0"
          transition
          anchor="top end"
        >
          <MenuItem>
            <Button
              className="data-[focus]:bg-highlight flex w-full items-center rounded-2xl p-3"
              onClick={() => setIsClientOverlayOpen(!isClientOverlayOpen)}
            >
              <div className="pr-2.5">
                <BsPerson />
              </div>
              <div>Dodaj Klienta</div>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className="data-[focus]:bg-highlight flex w-full items-center rounded-2xl p-3"
              onClick={() => setIsTasksOverlayOpen(!isTasksOverlayOpen)}
            >
              <div className="pr-2.5">
                <MdOutlineTask />
              </div>
              <div>Dodaj Zlecenie</div>
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <InputClientOverlay
        isOpen={isClientOverlayOpen}
        onClose={() => setIsClientOverlayOpen(false)}
      />
      <InputClientOverlay
        isOpen={isTasksOverlayOpen}
        onClose={() => setIsTasksOverlayOpen(false)}
      />
    </>
  );
}

export default AddButton;
