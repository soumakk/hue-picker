import { Toaster } from "sonner";
import ColorInput from "./components/ColorInputBox";
import ColorName from "./components/ColorName";
import ColorPreview from "./components/ColorPreview";
import GLSLControls from "./components/controls/GLSLControls";
import HexControls from "./components/controls/HexControls";
import HSVControls from "./components/controls/HSVControls";
import OKLCHControls from "./components/controls/OKLCHControls";
import RGBControls from "./components/controls/RGBControls";
import ColorPickerCard from "./components/layout/ColorPickerCard";
import { TooltipProvider } from "./ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className="max-w-[1440px] mx-auto p-5">
        <div className="flex justify-center">
          <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 inline-block mx-auto text-4xl my-4 font-medium">
            Hue Picker
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <div>
            <ColorPickerCard />
            <ColorPreview />
          </div>

          <div className="px-4 space-y-5 py-6">
            <ColorInput />

            <HexControls />
            <ColorName />
            <RGBControls />
            <HSVControls />
            <GLSLControls />
            <OKLCHControls />
          </div>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
