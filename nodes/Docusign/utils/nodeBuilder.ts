import type { INodeProperties } from "n8n-workflow";

export function buildOperationProperties(
  resourceName: string,
  resource: any,
): INodeProperties[] {
  const properties: INodeProperties[] = [];
  const resourceOperations = Object.keys(resource).filter(
    (key) => key !== "operations",
  );

  for (const operation of resourceOperations) {
    if (resource[operation]?.description) {
      for (const prop of resource[operation].description) {
        properties.push({
          ...prop,
          displayOptions: {
            ...prop.displayOptions,
            show: {
              ...prop.displayOptions?.show,
              resource: [resourceName],
              operation: [operation],
            },
          },
        });
      }
    }
  }

  return properties;
}

export function buildAllOperationProperties(
  resources: Record<string, any>,
): INodeProperties[] {
  const allProperties: INodeProperties[] = [];

  for (const [resourceName, resource] of Object.entries(resources)) {
    allProperties.push(...buildOperationProperties(resourceName, resource));
  }

  return allProperties;
}
