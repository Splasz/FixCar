import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Badge } from "@mui/material";
import { FaBell, FaRegHourglass } from "react-icons/fa";

export default function NotificationDropDown() {
  return (
    <div className="relative w-fit">
      <Menu>
        <MenuButton className="hover:bg-highlight active:bg-highlight cursor-pointer rounded-full p-1">
          <Badge color="error" variant="dot">
            <FaBell className="text-primary size-7" />
          </Badge>
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="text-text border-primary/30 bg-primary/70 absolute right-0 z-50 mt-2 w-fit origin-top-right rounded-xl border p-1 text-sm shadow-lg ring-1 ring-black/10 backdrop-blur-md focus:outline-none"
        >
          <MenuItem>
            <div className="hover:bg-primary/30 flex w-full items-center gap-3.5 rounded-lg px-3 py-1.5 text-white">
              <div className="bg-primary/50 rounded-xl p-2.5">
                <FaRegHourglass className="size-5" />
              </div>
              <div>
                <div className="text-base font-medium">Koniec terminu</div>
                <div>Zbliża się termin oddania zlecenia</div>
              </div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
