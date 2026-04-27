import { atomWithStorage } from "jotai/utils";
import { Controls, Formats } from "./helpers";

export const activeFormatAtom = atomWithStorage<Formats | null | undefined>(
  "format",
  Formats.Code,
);

export const activeControlAtom = atomWithStorage<Controls | null | undefined>(
  "control",
  Controls.RGB,
);
