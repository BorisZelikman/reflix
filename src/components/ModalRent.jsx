import React from "react";
import ReactDOM from "react-dom";
function ModalRent({isOpen, onClose, children}) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                {children}
                <button onClick={onClose}>X</button>
            </div>
        </div>,
        document.getElementById('modal-root')
      );
}

export default ModalRent;