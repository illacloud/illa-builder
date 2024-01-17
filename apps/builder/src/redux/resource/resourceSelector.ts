import { Resource, ResourceContent } from "@illa-public/public-types"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getAllResources = (state: RootState) => state.resource

export const getResourceIDMapResource = createSelector(
  [getAllResources],
  (allResource) => {
    const resourceIDMapResource: Record<string, Resource<ResourceContent>> = {}
    allResource.forEach((resource) => {
      resourceIDMapResource[resource.resourceID] = resource
    })
    return resourceIDMapResource
  },
)
