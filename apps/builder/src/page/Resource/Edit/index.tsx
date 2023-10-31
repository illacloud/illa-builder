import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { ResourceCreateOrEditPanel } from "../CreateOrEdit"

export const ResourceEdit: FC = () => {
  const { resourceID } = useParams()

  const resourceList = useSelector(getAllResources)

  const resource = resourceList.find((r) => r.resourceID === resourceID)

  if (!resource) {
    return <Navigate to="/404" />
  }

  const resourceType = resource.resourceType

  return (
    <ResourceCreateOrEditPanel
      resourceType={resourceType}
      resourceID={resourceID}
    />
  )
}
