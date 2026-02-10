import * as del from "./operations/delete";
import * as get from "./operations/get";
import * as list from "./operations/list";
import * as update from "./operations/update";
import * as updateList from "./operations/updateList";
import { operations } from "./operationsDescription";

export { operations };

export const envelopeDocuments = {
  delete: del,
  get,
  list,
  update,
  updateList,
};
