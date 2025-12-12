import * as create from "./create";
import * as get from "./get";
import * as list from "./list";

export const templateCreateDescription = create.templateCreateDescription;
export const templateGetDescription = get.templateGetDescription;
export const templateListDescription = list.templateListDescription;

export const templates = {
  create,
  get,
  list,
};
