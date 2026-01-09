import * as create from "./operations/create";
import * as del from "./operations/delete";
import * as get from "./operations/get";
import * as list from "./operations/list";
import * as update from "./operations/update";
import { operations } from "./operationsDescription";

export { operations };

export const groups = {
  create,
  delete: del,
  get,
  list,
  update,
};
