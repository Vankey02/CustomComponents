import { useAnimate, motion } from "framer-motion";
import { useState } from "react";
export default function HoverFill() {
  const [size, setSize] = useState<number[]>([]);

  const [scope, animate] = useAnimate();

  return (
    <motion.div
      id="ggg"
      ref={scope}
      className="flex justify-center items-center relative w-[50vw] h-52 bg-violet-400 rounded-lg overflow-hidden "
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        animate(scope.current, { backgroundColor: "#fca5a5" });
      }}
      onMouseEnter={(e) => {
        console.log("enter");

        let offsets = document.querySelector("#ggg")?.getBoundingClientRect();
        var top = offsets?.top;
        var left = offsets?.left;
        var hei = offsets?.height;
        var wei = offsets?.width;
        console.log("Y", e.clientY);
        console.log("X", e.clientX);
        console.log("top", top, "left", left);
        // elem?.addEventListener("mousemove", handler);
        if (left && top) {
          setSize([e.clientX - left, e.clientY - top]);
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
        // animate(
        //   "#ripple",
        //   { left: `${size[0]}px`, top: `${size[1]}px` },
        //   { duration: 0.1 }
        // );
      }}
      onMouseLeave={(e) => {
        let offsets = document.querySelector("#ggg")?.getBoundingClientRect();
        var top = offsets?.top;
        var left = offsets?.left;
        var hei = offsets?.height;
        var wei = offsets?.width;
        console.log("Y", e.clientY);
        console.log("X", e.clientX);
        console.log("top", top, "left", left);
        console.log("h", hei, "w", wei);
        if (left && top) {
          setSize([e.clientX - left - 5, e.clientY - top - 5]);
        }
        animate(
          "#ripple",
          {
            scale: 0,
            visibility: "visible",
          },
          { duration: 0.3 }
        );
      }}
    >
      <motion.div
        id="ripple"
        className="absolute bg-red-300  rounded-full"
        style={{
          visibility: "hidden",
          left: `${size[0]}px`,
          top: `${size[1]}px`,
          width: "1px",
          height: "1px",
          scale: 0,
        }}
      ></motion.div>
      <span className="flex relative text-white text-3xl">OK</span>
    </motion.div>
  );
}
