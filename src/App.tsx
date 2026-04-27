import ColorPreview from "./components/ColorPreview";
import ColorControls from "./components/layout/ColorControls";
import ColorPickerCard from "./components/layout/ColorPickerCard";
import { TooltipProvider } from "./ui/tooltip";
import Header from "./components/layout/Header";
import ContrastRadio from "./components/layout/ContrastRadio";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TooltipProvider>
      <div className="max-w-[1440px] mx-auto p-5">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
          <div className="flex flex-col gap-4 col-span-2">
            <ColorPickerCard />
            <ColorPreview />
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            <ColorControls />
            <ContrastRadio />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </TooltipProvider>
  );
}

export default App;
