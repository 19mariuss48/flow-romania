import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
const logo = "/assets/flow-logo-BUuYbusT.png";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export {
  cn as c,
  logo as l
};
