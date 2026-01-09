import * as get from "./operations/get";
import * as list from "./operations/list";
import { operations } from "./operationsDescription";

export { operations };

export const bulkEnvelopes = {
  get,
  list,
};
