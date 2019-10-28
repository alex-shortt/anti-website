import React, { useEffect, useState } from "react";

export function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
  }, [window.location.hash, window.location]);

  const validHash = hash !== "";

  return { hash, validHash };
}
