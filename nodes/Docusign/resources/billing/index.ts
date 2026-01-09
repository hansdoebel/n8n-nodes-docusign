import * as get from "./operations/get";
import * as getCharges from "./operations/getCharges";
import * as getInvoices from "./operations/getInvoices";
import { operations } from "./operationsDescription";

export { operations };

export const billing = {
  get,
  getCharges,
  getInvoices,
};
