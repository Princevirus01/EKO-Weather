
// src/components/NotificationBanner.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBanner({ notification, onClose }) {
  if (!notification) return null;

  const bgClass =
    notification.type === "high"
      ? "bg-danger text-white"
      : notification.type === "low"
      ? "bg-primary text-white"
      : "bg-info text-dark";

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.text}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`alert ${bgClass} d-flex justify-content-between align-items-center shadow`}
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
            minWidth: "300px",
            maxWidth: "500px",
            borderRadius: "8px",
          }}
        >
          <span>{notification.text}</span>
          <button
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Close"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
