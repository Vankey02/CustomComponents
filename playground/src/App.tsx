import "./App.css";
import BarCodeReader from "./components/BarCodeReader/BarCodeReader";
import DatePicker from "./components/Datepicker/DatePicker";
import HoverFill from "./components/HoverFill/HoverFill";

function App() {
  return (
    <>
      <div className="flex flex-col relative items-center justify-center gap-10  py-24 ">
        <DatePicker />
        <BarCodeReader />
        <HoverFill />
      </div>
    </>
  );
}

export default App;
