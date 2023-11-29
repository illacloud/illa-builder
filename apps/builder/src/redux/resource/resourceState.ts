import {
  Resource,
  ResourceContent,
  ResourceType,
} from "@illa-public/public-types"

export interface ResourceInitialConfig<T extends ResourceContent> {
  resourceName: string
  resourceType: ResourceType
  content: T
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
