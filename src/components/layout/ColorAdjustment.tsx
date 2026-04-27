import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import HSVControls from "../controls/HSVControls";
import RGBControls from "../controls/RGBControls";
import { useAtom } from "jotai";
import { activeControlAtom } from "../../utils/atoms";
import { Controls } from "../../utils/helpers";

const controls = [Controls.RGB, Controls.HSV];

export default function ColorAdjustment() {
  const [active, setActive] = useAtom(activeControlAtom);

  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium ">Adjustments</h3>

        <Select value={active} onValueChange={setActive}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {controls?.map((c) => (
                <SelectItem value={c} key={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {active === Controls.RGB && <RGBControls />}
      {active === Controls.HSV && <HSVControls />}
    </div>
  );
}
