// client/src/components/NotificationPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function NotificationPanel() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.get("/api/notifications").then(res => setNotifs(res.data));

    const socket = io("http://localhost:5000");
    socket.on("notification", (notif) => {
      setNotifs(prev => [notif, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="notif-panel">
      <h4>การแจ้งเตือน</h4>
      <ul>
        {notifs.map(n => (
          <li key={n._id}>
            <strong>{n.title}</strong>
            <div>{n.message}</div>
            <small>{new Date(n.createdAt).toLocaleString("th-TH")}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
