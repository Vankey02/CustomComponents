import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function HoverFill() {
  const [size, setSize] = useState<number[]>([]);
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

  // useEffect(() => {
  //   animate("#ripple", {
  //     left: size[0],
  //     top: size[1],
  //   });
  // }, [size]);
  useEffect(() => {
    let offsets = document.querySelector("#ggg")?.getBoundingClientRect();
    var top = offsets?.top;
    var left = offsets?.left;
    // var hei = offsets?.height;
    var wei = offsets?.width;
    console.log("Y", mousePos?.y);
    console.log("X", mousePos?.x);
    console.log("top", top, "left", left);
    // elem?.addEventListener("mousemove", handler);
    if (mousePresence) {
      if (left && top && mousePos) {
        setSize([mousePos?.x - left, mousePos?.y - top]);
      }
      if (wei)
        animate(
          "#ripple",
          {
            scale: wei * 2.3,
            visibility: "visible",
          },
          { duration: 1.2 }
        );
    } else {
      if (left && top && mousePos) {
        setSize([mousePos?.x - left, mousePos?.y - top]);
      }
      animate(
        "#ripple",
        {
          scale: 0,
          visibility: "visible",
        },
        { duration: 0.4 }
      );
    }
  }, [mousePresence]);

  return (
    <motion.div
      id="ggg"
      ref={scope}
      className="flex justify-center items-center relative w-[50vw] h-52 text-[#616847] bg-[#e4e3c1] rounded-lg overflow-hidden hover:cursor-pointer "
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        animate(scope.current, { backgroundColor: "#e4e3c1" });
      }}
      onMouseEnter={() => {
        console.log("enter");
        setMousePresence(true);
      }}
      onMouseLeave={() => {
        setMousePresence(false);
      }}
      whileHover={{ color: "#e4e3c1", transition: { duration: 1.2 } }}
    >
      <motion.div
        id="ripple"
        className="absolute bg-[#616847]  rounded-full"
        style={{
          visibility: "hidden",
          left: `${size[0]}px`,
          top: `${size[1]}px`,
          width: "1px",
          height: "1px",
          scale: 0,
        }}
      ></motion.div>
      <span className="flex relativ text-3xl z-20">OK</span>
    </motion.div>
  );
}
