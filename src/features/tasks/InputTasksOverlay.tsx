import Overlay from "../../components/Overlay";
import { Textarea } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

type InputClientOverlay = {
  isOpen: boolean;
  onClose: () => void;
};

function InputTasksOverlay({ isOpen, onClose }: InputClientOverlay) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
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
  );
}

export default InputTasksOverlay;
