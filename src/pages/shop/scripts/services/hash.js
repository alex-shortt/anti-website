import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";

export function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    console.log("should re-render!");
    setHash(window.location.hash);
  }, [window.location.hash, window.location]);

  const validHash = hash !== "";

  return { hash, setHash, validHash };
}

export default function HashUpdater(props) {
  const { setHash } = props;
  const { location } = useReactRouter();
  useEffect(() => setHash(location.hash), [location]);
  return <></>;
}
