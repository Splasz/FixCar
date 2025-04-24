import Overlay from "./Overlay";

type InputCarOverlay = {
  isOpen: boolean;
  onClose: () => void;
  acceptRisk: () => void;
};

function WarningAlert({ isOpen, onClose, acceptRisk }: InputCarOverlay) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose} closeButton={false}>
      <div>
        <div className="mb-4 text-2xl font-bold">UWAGA</div>
        <div className="mb-6">
          Czy chcesz usunąć klienta i wszystkie powiązane z nim pojazdy?
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={acceptRisk}
            className="bg-accent cursor-pointer rounded-xl px-4 py-2 font-medium text-white hover:opacity-85 hover:drop-shadow-md"
          >
            Tak
          </button>
          <button
            className="cursor-pointer rounded-xl bg-gray-300 px-4 py-2 hover:opacity-85 hover:drop-shadow-md"
            onClick={onClose}
          >
            Anuluj
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default WarningAlert;
