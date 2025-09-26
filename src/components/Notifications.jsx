
import React from "react";

export default function Notifications({ notifications, setNotifications }) {
  const removeNotification = (id) => {
    setNotifications((n) => n.filter((note) => note.id !== id));
  };

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {notifications.map((note) => (
        <div
          key={note.id}
          className="toast show align-items-center text-bg-primary border-0 mb-2"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{note.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => removeNotification(note.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}
