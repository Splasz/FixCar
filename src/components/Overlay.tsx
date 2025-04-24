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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="relative w-fit max-w-full rounded-3xl bg-white p-5 shadow-lg">
        <button
          onClick={onClose}
          className="text-accent hover:bg-highlight absolute top-5 right-5 rounded-full text-3xl"
        >
          <IoClose />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Overlay;
