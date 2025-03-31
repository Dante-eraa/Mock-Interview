import Modal from "./Modal";
import { Button } from "./ui/button";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const SaveModal = ({ isOpen, onClose, onConfirm, loading }: SaveModalProps) => {
  return (
    <Modal
      title="Are you sure?"
      description="Once saved, you won’t be able to modify or re-record this answer."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-800"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default SaveModal;
