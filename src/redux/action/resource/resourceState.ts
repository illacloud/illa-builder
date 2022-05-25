export interface Resource {
  id: string
  name: string
  type: "database" | "api"
  // TODO: restrict by resource type. e.g. MySQL config
  config: any
}
export type ResourceListState = Resource[]
export const resourceInititalState: ResourceListState = []
