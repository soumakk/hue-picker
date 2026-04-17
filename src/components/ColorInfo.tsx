import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import GLSLControls from "./GLSLControls";
import HSVControls from "./HSVControls";
import HexControls from "./HexControls";
import OKLCHControls from "./OKLCHControls";
import RGBControls from "./RGBControls";

const tabs = ["RGB", "HSV", "HEX", "GLSL", "OKLCH"];

export default function ColorInfo() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useHotkeys("1", () => setSelectedIndex(0));
  useHotkeys("2", () => setSelectedIndex(1));
  useHotkeys("3", () => setSelectedIndex(2));
  useHotkeys("4", () => setSelectedIndex(3));
  useHotkeys("5", () => setSelectedIndex(4));

  return (
    <div className="px-4 space-y-5 py-6">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className=" rounded-xl h-10 flex items-center justify-between gap-5 bg-zinc-100 p-1">
          {tabs?.map((tab, idx) => (
            <Tab
              key={tab}
              className="flex-1 flex items-center justify-center gap-1 h-full rounded-lg data-[selected]:bg-white data-[selected]:shadow-sm  outline-none font-medium text-sm"
            >
              {tab}
              {/*<div className="h-5 w-5 bg-white flex items-center justify-center rounded-md">
                {idx + 1}
              </div>*/}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <RGBControls />
          </TabPanel>
          <TabPanel>
            <HSVControls />
          </TabPanel>
          <TabPanel>
            <HexControls />
          </TabPanel>
          <TabPanel>
            <GLSLControls />
          </TabPanel>
          <TabPanel>
            <OKLCHControls />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* <div className="flex items-center gap-4">
				<p className="text-slate-500 font-semibold uppercase text-sm">cmyk</p>
				<p className="text-slate-800 font-semibold">{cmyk.c}</p>
				<p className="text-slate-800 font-semibold">{cmyk.m}</p>
				<p className="text-slate-800 font-semibold">{cmyk.y}</p>
				<p className="text-slate-800 font-semibold">{cmyk.k}</p>
			</div> */}
    </div>
  );
}
