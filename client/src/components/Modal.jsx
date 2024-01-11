import { Children, cloneElement } from "react";
const Modal = ({ open, setOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-10 ${
        open ? "bg-gray-700/20" : "hidden"
      }`}
      onClick={() => setOpen(0)}
    >
      <div
        className={`bg-white rounded-lg shadow p-6
        transition-all w-1/3
        ${open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 
            border border-neutral-200 rounded-md text-gray-400
            bg-white hover:bg-gray-50 hover:text-gray-600"
          onClick={() => setOpen(0)}
        >
          X
        </button>
        {Children.map(children, (child) => {
          return child ? cloneElement(child, { open, setOpen }) : null;
        })}
      </div>
    </div>
  );
};

export default Modal;
