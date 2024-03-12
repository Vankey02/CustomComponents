// import Quagga from "quagga";
import Quagga from "@ericblade/quagga2";
import { useEffect, useState } from "react";

export default function BarCodeReader() {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    console.log(image);
    Quagga.decodeSingle(
      {
        decoder: {
          readers: ["code_128_reader"], // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: image, // or 'data:image/jpg;base64,' + data
      },
      function (result) {
        if (result.codeResult) {
          console.log("result", result.codeResult.code);
        } else {
          console.log("not detected");
        }
      }
    );
  }, [image]);
  return (
    <>
      <input
        id="photoInput"
        className="invisible"
        type="file"
        onChange={(e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          console.log(file);
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            if (reader.result != null) {
              setImage(reader.result.toString());
            } //error
          };
          //
        }}
      />
      <button
        className=""
        onClick={() => {
          document.getElementById("photoInput")?.click();
        }}
      >
        click
      </button>
    </>
  );
}
