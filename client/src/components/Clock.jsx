import { useEffect, useState } from "react";

// fungsi untuk menampilkan jam dinamis
export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  return time
    .toLocaleTimeString("id-ID", {
      hour: "numeric",
      minute: "numeric",
    })
    .replaceAll(".", ":");
}
