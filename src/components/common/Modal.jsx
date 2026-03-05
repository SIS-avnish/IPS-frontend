import React from 'react';


const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg w-2xl p-3 relative">
        
        <button
          onClick={onClose}
          className="bg-black  text-white px-2 py-1 rounded-lg transition position absolute top-2 right-2"
        >
         X
        </button>

        <img
          src="/telephone-directory.jpg"
          alt="Telephone Directory"
          className="w-full rounded-lg mb-4"
        />


      </div>
    </div>
  );
};

export default Modal;