import { useContext } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import ColorInfo from "./components/ColorInfo";
import { ColorContext } from "./lib/ColorContext";
import { ColorUtils } from "./lib/ColorUtils";
import ColorPreview from "./components/ColorPreview";

function App() {
  const { color, setColor } = useContext(ColorContext);
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex justify-center">
        <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 inline-block mx-auto text-4xl my-4 font-medium">
          Hue Picker
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        <div>
          <div className="py-6">
            <ColorPicker
              height={400}
              color={color}
              onChange={(color) => {
                setColor(ColorUtils.convert("hsv", color.hsv));
              }}
              hideInput
            />
          </div>

          <ColorPreview />
        </div>
        <ColorInfo />
      </div>
    </div>
  );
}

export default App;
