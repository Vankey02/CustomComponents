import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MaskHoverRipple() {
  //   const [maskPoz, setMaskPoz] = useState<number[]>([100, 100]);
  const [mousePresence, setMousePresence] = useState<boolean>();
  const [scope, animate] = useAnimate();

  type mouseDetect = {
    x: number;
    y: number;
  };
  const [mousePos, setMousePos] = useState<mouseDetect>();

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let offsets = document.querySelector("#ezz")?.getBoundingClientRect();
    var top = offsets?.top;
    var left = offsets?.left;
    var elementWidth = offsets?.height;
    var elementHeight = offsets?.width;
    console.log("mouseY", mousePos?.y);
    console.log("mouseX", mousePos?.x);
    console.log("elemTop", top, "elemLeft", left);
    if (mousePos && left) console.log("positionLeft", mousePos?.x - left);
    if (mousePos && top && elementHeight)
      console.log("positionTop", mousePos?.y - top);
    if (mousePresence) {
      if (left && top && mousePos && elementHeight && elementWidth) {
        (async () => {
          await animate(
            scope.current,
            {
              WebkitMaskPosition: `${mousePos?.x - left - 0 / 2}px ${
                mousePos?.y - top - 0 / 2
              }px`,
            },
            { duration: 0 }
          );
          //   setMaskPoz([
          //     mousePos?.x - left - 400 / 2,
          //     mousePos?.y - top - 400 / 2,
          //   ]);
          Math.sqrt(Math.pow(elementHeight, 2) + Math.pow(elementWidth, 2));
          await animate(
            scope.current,
            {
              WebkitMaskPosition: `${
                mousePos?.x -
                left -
                Math.sqrt(
                  Math.pow(elementHeight, 2) + Math.pow(elementWidth, 2)
                )
              }px ${
                mousePos?.y -
                top -
                Math.sqrt(
                  Math.pow(elementHeight, 2) + Math.pow(elementWidth, 2)
                )
              }px`,
              maskSize: `${
                Math.sqrt(
                  Math.pow(elementHeight, 2) + Math.pow(elementWidth, 2)
                ) * 2
              }px`,
            },
            { duration: 1 }
          );
        })();
      }
    } else {
      if (left && top && mousePos && elementHeight && elementWidth) {
        animate(
          scope.current,
          {
            maskSize: `${0}px`,
            WebkitMaskPosition: `${mousePos?.x - left - 0 / 2}px ${
              mousePos?.y - top - 0 / 2
            }px`,
          },
          { duration: 0.3 }
        );
      }
    }
  }, [mousePresence]);

  return (
    <motion.div
      id="ezz"
      className="flex relative w-[500px] h-52 border-2 border-violet-500 bg-black overflow-hidden"
      onMouseEnter={() => {
        setMousePresence(true);
      }}
      onMouseLeave={() => {
        setMousePresence(false);
      }}
    >
      <div className="flex relative w-[500px] h-52  text-white text-2xl font-extrabold justify-center items-center">
        <p>Twoja stara to kopara</p>
      </div>

      <motion.div
        id="ripple2"
        ref={scope}
        className="flex maska inset-0 h-52  border-green-500 text-2xl font-extrabold justify-center items-center"
        style={{
          maskRepeat: "no-repeat",
          maskSize: `${0}px`,
          color: "black",
        }}
      >
        <p>Twoja stara to kopara</p>
      </motion.div>
    </motion.div>
  );
}
