import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const ModalWrapper = ({
  title,
  isOpen,
  onClose,
  maxWidth = "md",
  children,
  renderFooter,
  renderHeader,    // <-- new prop for custom header
  resetOnClose,
}) => {
  const modalRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (resetOnClose) resetOnClose();
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isClosing ? "animate-fade-out" : "animate-fade-in"
      } bg-black/40`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-2xl w-full max-w-${maxWidth} mx-4 transform ${
          isClosing ? "animate-fly-out" : "animate-fly-in"
        }`}
      >
        {/* Header */}
        {renderHeader ? (
          renderHeader({ close: handleClose })
        ) : (
          <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-cyan-500 text-white rounded-t-lg">
            <span className="font-semibold">{title}</span>
            <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/20">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children({ close: handleClose })}</div>

        {/* Footer */}
        {renderFooter && <div className="p-4 border-t-2 border-gray-100">{renderFooter({ close: handleClose })}</div>}
      </div>
    </div>
  );
};
