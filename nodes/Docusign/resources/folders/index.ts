import * as get from "./operations/get";
import * as getItems from "./operations/getItems";
import * as list from "./operations/list";
import { operations } from "./operationsDescription";

export { operations };

export const folders = {
  get,
  getItems,
  list,
};
