import { ReactNode, createContext, useState } from "react";
import { initialColor } from "../../utils/const";
import { ColorUtils, IColor } from "./ColorUtils";

interface IColorContext {
  color: IColor;
  setColor: (color: IColor) => void;
}

export const ColorContext = createContext<IColorContext>({} as IColorContext);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState(ColorUtils.convert("hex", initialColor));
  // const [color, setColor] = useColor(initialColor)
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};
