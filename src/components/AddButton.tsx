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
          // onClick={() => setRotated(!rotated)}
          className={`right-5 bottom-5 absolute w-fit bg-primary text-background p-2.5 rounded-full text-4xl pr-5 pl-5 hover:opacity-90 hover:cursor-pointer`}
        >
          +
        </MenuButton>
        <MenuItems
          className="[--anchor-gap:8px] flex flex-col items-start bg-primary p-2.5 w-64  text-background rounded-3xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          transition
          anchor="top end"
        >
          <MenuItem>
            <Button
              className="flex items-center p-3 w-full data-[focus]:bg-highlight rounded-2xl"
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
              className="flex items-center p-3 w-full data-[focus]:bg-highlight rounded-2xl"
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
