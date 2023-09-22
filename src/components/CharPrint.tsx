import React, { useRef, useEffect } from 'react';
interface IProps {
  text: string;
  interval?: number;
}

function typeChar(text: string, eleRef: any, interval = 50) {
  var timerOut = null;
  var i = 0;
  function titleWriter() {
    if (i < text.length) {
      eleRef.current.innerText = text.slice(0, i + 1);
      i++;
      // @ts-ignore
      timerOut = setTimeout(titleWriter, interval);
    } else {
      i = 0;
      // @ts-ignore
      clearTimeout(timerOut);
    }
  }
  titleWriter();
}

export default function CharPrint(props: IProps) {
  const { text, interval = 100 } = props;
  const eleRef = useRef(null);

  useEffect(() => {
    typeChar(text, eleRef, interval);
  }, [text, interval]);

  return <div ref={eleRef}></div>;
}
