import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import { FC, useRef, cloneElement } from "react"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { useSelector } from "react-redux"
import { ConfigureResourceFormProps } from "./interface"
import { MySQL, RESTAPI } from "./Resources"
import {
  FormContainerCSS,
  FormFooterCSS,
  BackIconCSS,
  FormFooterFilling,
  CreateResourceBtnCSS,
} from "./style"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  const { resourceId, back, onSubmit, resourceType: resourceTypeProps } = props

  const resource = useSelector(selectAllResource).find(
    (i) => i.id === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.type

  const formRef = useRef<HTMLFormElement>(null)

  const renderResouceNode = () => {
    let node = null

    switch (resourceType) {
      case "REST API":
        node = <RESTAPI resourceId={resourceId} />
        break
      case "MySQL":
        node = <MySQL resourceId={resourceId} />
        break
      default:
        node = <div>No Config</div>
        break
    }

    return cloneElement(node, { ref: formRef }) || null
  }

  function submitForm() {
    formRef.current?.requestSubmit()
    onSubmit && onSubmit()
  }

  return (
    <div css={FormContainerCSS}>
      <div>{renderResouceNode()}</div>

      <div css={FormFooterCSS}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
          onClick={back}
        >
          <PaginationPreIcon css={BackIconCSS} />
          Back
        </Button>

        <div css={FormFooterFilling} />

        <Button size="medium" colorScheme="gray" type="button">
          Test Connection
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={CreateResourceBtnCSS}
          onClick={submitForm}
        >
          Create Resource
        </Button>
      </div>
    </div>
  )
}
