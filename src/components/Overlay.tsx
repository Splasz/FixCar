import React, { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay-content flex bg-[rgba(0,0,0,0.1)] border-1 fixed w-dvw h-dvh top-0 ">
        <div className="overlay-content p-5 justify-end fixed bg-white rounded-3xl m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit">
          <div className="absolute right-5 top-5 justify-end">
            <button
              onClick={onClose}
              className="text-3xl text-accent hover:bg-highlight rounded-full"
            >
              <IoClose />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
