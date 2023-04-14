import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import { ResourceTypeSelector } from "@/page/Dashboard/components/ResourceGenerator/ResourceTypeSelector"
import {
  ResourceCreatorPage,
  ResourceGeneratorProps,
} from "@/page/Dashboard/components/ResourceGenerator/interface"
import { ResourceType } from "@/redux/resource/resourceState"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { track } from "@/utils/mixpanelHelper"
import { modalContentStyle } from "./style"

export const ResourceGenerator: FC<ResourceGeneratorProps> = (props) => {
  const { visible, onClose } = props
  const [currentStep, setCurrentStep] = useState<ResourceCreatorPage>("select")

  const [currentResource, setCurrentResource] = useState<ResourceType | null>(
    null,
  )

  const { t } = useTranslation()

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
  useEffect(() => {
    visible &&
      currentStep === "createResource" &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
        {
          element: "resource_configure_modal",
          parameter1: "resource_new",
          parameter5: currentResource,
        },
      )
  }, [visible, currentStep, currentResource])

  const isMaskCloseable = currentStep === "select"

  return (
    <Modal
      w="832px"
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskCloseable}
      withoutLine
      withoutPadding
      title={title}
      onCancel={() => {
        onClose()
        setCurrentStep("select")
        setCurrentResource(null)
      }}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <ResourceTypeSelector
            onSelect={(resourceType) => {
              setCurrentStep("createResource")
              setCurrentResource(resourceType)
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                {
                  element: "resource_type_modal_resource",
                  parameter5: resourceType,
                },
              )
            }}
          />
        )}
        {currentStep === "createResource" && currentResource != null && (
          <ResourceCreator
            onBack={() => {
              setCurrentStep("select")
              setCurrentResource(null)
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                {
                  element: "resource_configure_back",
                  parameter1: "resource_new",
                  parameter5: currentResource,
                },
              )
            }}
            onFinished={() => {
              setCurrentStep("select")
              setCurrentResource(null)
              onClose()
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                {
                  element: "resource_configure_save",
                  parameter1: "resource_new",
                  parameter5: currentResource,
                },
              )
            }}
            onTestConnectReport={(resourceType: string) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                {
                  element: "resource_configure_test",
                  parameter1: "resource_new",
                  parameter5: resourceType,
                },
              )
            }}
            resourceType={currentResource}
          />
        )}
      </div>
    </Modal>
  )
}

ResourceGenerator.displayName = "ResourceGenerator"
