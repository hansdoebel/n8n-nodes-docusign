import * as del from "./operations/delete";
import * as get from "./operations/get";
import * as list from "./operations/list";
import { operations } from "./operationsDescription";

export { operations };

export const diagnostics = {
  delete: del,
  get,
  list,
};
