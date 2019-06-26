import { Selector } from "@xbyorange/mercury";
import { desktopCollection } from "../origins/desktopCollection";
import { mobileCollection } from "../origins/mobileCollection";
import { mediaQueryFiltered } from "../origins/mediaQuery";

// Example of a Selector that can return different origins depending of previous origin results
export const deviceDataFiltered = new Selector(
  {
    source: mediaQueryFiltered,
    query: () => "device"
  },
  device => {
    const apiToCall = device === "mobile" ? mobileCollection : desktopCollection;
    return apiToCall;
  },
  []
);

let previousDevice;
const mobileMaxWidth = 800;

window.onresize = () => {
  const width = window.innerWidth,
    device = width <= mobileMaxWidth ? "mobile" : "desktop";
  if (previousDevice !== device) {
    previousDevice = device;
    mediaQueryFiltered.query("device").update(device);
  }
};

window.onresize();
