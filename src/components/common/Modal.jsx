const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
        
        <button
          onClick={onClose}
          className="bg-black text-white px-3 py-2 rounded-lg transition absolute top-4 right-4 hover:bg-gray-800"
        >
         ✕
        </button>

        <div className="pt-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;