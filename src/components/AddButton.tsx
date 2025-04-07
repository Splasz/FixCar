import { MdOutlineTask } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import Overlay from "./Overlay";
import "./AddButton.css";
import { Textarea } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

function AddButton() {
  const [rotated, setRotated] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton
          onClick={() => setRotated(!rotated)}
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
              onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            >
              <div className="pr-2.5">
                <BsPerson />
              </div>
              <div>Dodaj Klienta</div>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button className="flex items-center p-3 w-full data-[focus]:bg-highlight rounded-2xl">
              <div className="pr-2.5">
                <MdOutlineTask />
              </div>
              <div>Dodaj Zlecenie</div>
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
      >
        <div className="flex flex-col gap-2.5">
          <div className="border-b-1 border-highlight text-2xl">
            Dodaj Nowego Klienta
          </div>
          <form className="flex flex-col gap-5">
            <div className="flex gap-3.5">
              <label className="flex flex-col">
                <span className=" after:ml-0.5 after:text-red-500 after:content-['*']">
                  Imię
                </span>
                <input placeholder="Jan" type="text" className="client"></input>
              </label>

              <label className="flex flex-col">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Nazwisko
                </span>
                <input
                  placeholder="Kowalski"
                  type="text"
                  className="client"
                ></input>
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                Telefon
                <input
                  placeholder="+48"
                  maxLength={9}
                  type="text"
                  className="client w-1/2"
                ></input>
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                E-mail
                <input
                  placeholder="example@email.com"
                  type="email"
                  className="client w-1/2"
                ></input>
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                Notatka
                <Textarea
                  placeholder="..."
                  className="client_note h-24"
                ></Textarea>
              </label>
            </div>
            <div>
              <button className="flex items-center gap-2.5 text-xl p-2 rounded-2xl text-background bg-primary w-1/3 cursor-pointer">
                <FaCheck />
                Dodaj
              </button>
            </div>
          </form>
        </div>
      </Overlay>
    </>
  );
}

export default AddButton;
