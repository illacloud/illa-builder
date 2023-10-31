import { ResourceType } from "@illa-public/public-types"
import { FC, Suspense, useCallback } from "react"
import { useSelector } from "react-redux"
import { ResourceCreatorProps } from "@/page/App/components/Actions/ResourceGenerator/ResourceCreator/interface"
import { ResourceCreatePanel } from "@/page/Resource/components/resourceCreatePanel"
import { RootState } from "@/store"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const handleClickFinish = useCallback(() => {
    onFinished(resourceID)
  }, [onFinished, resourceID])

  return (
    <Suspense>
      <ResourceCreatePanel
        resourceID={resourceID}
        resourceType={finalResourceType as ResourceType}
        handleOnClickBack={handleBack}
        handleOnFinished={handleClickFinish}
      />
    </Suspense>
  )
}
