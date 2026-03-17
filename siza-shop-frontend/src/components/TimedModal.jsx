import { useEffect } from "react";

function TimedModal({ open, message, variant = "info", duration = 3000, onClose }) {
    useEffect(() => {
        if (!open) return undefined;
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    if (!open) return null;

    return (
        <div className="dropdown-notice-wrap">
            <div
                className={`dropdown-notice ${variant}`}
                role="status"
                aria-live="polite"
                onClick={onClose}
            >
                <span>{message}</span>
            </div>
        </div>
    );
}

export default TimedModal;
