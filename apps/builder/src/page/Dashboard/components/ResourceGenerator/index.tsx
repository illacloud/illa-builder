import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/react"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import { ResourceTypeSelector } from "@/page/Dashboard/components/ResourceGenerator/ResourceTypeSelector"
import {
  ResourceCreatorPage,
  ResourceGeneratorProps,
} from "@/page/Dashboard/components/ResourceGenerator/interface"
import { ResourceType } from "@/redux/resource/resourceState"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { modalContentStyle } from "./style"

export const ResourceGenerator: FC<ResourceGeneratorProps> = (props) => {
  const { visible, onClose } = props
  const [currentStep, setCurrentStep] = useState<ResourceCreatorPage>("select")
  const { track } = useContext(MixpanelTrackContext)

  const [currentResource, setCurrentResource] = useState<ResourceType | null>(
    null,
  )

  const onCancel = () => {
    const element =
      currentStep === "createResource"
        ? "resource_configure_close"
        : "resource_type_modal_close"
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element })
    onClose()
    setCurrentStep("select")
    setCurrentResource(null)
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (visible) {
      const element =
        currentStep === "createResource"
          ? "resource_configure_modal"
          : "resource_type_modal"
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element,
          parameter5: currentResource,
        },
        "both",
      )
    }
  }, [currentStep, visible, track, currentResource])

  let title
  switch (currentStep) {
    case "select":
      title = t("editor.action.form.title.select")
      break
    case "createResource":
      if (currentResource != null) {
        title = t("editor.action.form.title.configure", {
          name: getResourceNameFromResourceType(currentResource),
        })
      }
      break
  }
  const isMaskCloseable = currentStep === "select"

  return (
    <Modal
      w="1080px"
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskCloseable}
      withoutLine
      withoutPadding
      title={title}
      onCancel={onCancel}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <ResourceTypeSelector
            onSelect={(resourceType) => {
              setCurrentStep("createResource")
              setCurrentResource(resourceType)
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "resource_type_modal_resource",
                parameter5: resourceType,
              })
            }}
          />
        )}
        {currentStep === "createResource" && currentResource != null && (
          <ResourceCreator
            onBack={() => {
              setCurrentStep("select")
              setCurrentResource(null)
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "resource_configure_back",
                parameter5: currentResource,
              })
            }}
            onFinished={() => {
              setCurrentStep("select")
              setCurrentResource(null)
              onClose()
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "resource_configure_save",
                parameter5: currentResource,
              })
            }}
            resourceType={currentResource}
          />
        )}
      </div>
    </Modal>
  )
}

ResourceGenerator.displayName = "ResourceGenerator"
