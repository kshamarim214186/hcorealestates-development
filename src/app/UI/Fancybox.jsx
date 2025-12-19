import React, { useRef, useEffect, Fragment } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Fancybox(props) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};
    NativeFancybox.bind(container, delegate, options);
    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });
  return <div className={props.className} ref={containerRef}>{props.children}</div>;
}
