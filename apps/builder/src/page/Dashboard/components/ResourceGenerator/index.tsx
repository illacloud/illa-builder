import { FC, useState } from "react"
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

  return (
    <Modal
      w="832px"
      visible={visible}
      footer={false}
      closable
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
            }}
          />
        )}
        {currentStep === "createResource" && currentResource != null && (
          <ResourceCreator
            onBack={() => {
              setCurrentStep("select")
              setCurrentResource(null)
            }}
            onFinished={() => {
              setCurrentStep("select")
              setCurrentResource(null)
              onClose()
            }}
            resourceType={currentResource}
          />
        )}
      </div>
    </Modal>
  )
}

ResourceGenerator.displayName = "ResourceGenerator"
