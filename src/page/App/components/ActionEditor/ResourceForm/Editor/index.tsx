import { FC, useRef, cloneElement, RefObject } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import {
  MySQLConfigure,
  RESTAPIConfigure,
} from "@/page/App/components/ActionEditor/Resource"
import { ResourceType } from "@/page/App/components/ActionEditor/interface"
import { ResourceFormEditorProps, ConnectionRef } from "./interface"
import {
  formContainerStyle,
  formFooterStyle,
  backIconStyle,
  FormFooterFilling,
  createResourceBtnStyle,
} from "./style"

const renderResourceNode = (
  resourceType: ResourceType | undefined,
  connectionRef: RefObject<ConnectionRef>,
  formRef: RefObject<HTMLFormElement>,
  props: ResourceFormEditorProps,
) => {
  let node: JSX.Element
  const { resourceId } = props

  switch (resourceType) {
    case "REST API":
      node = <RESTAPIConfigure resourceId={resourceId} />
      break
    case "MySQL":
      node = (
        <MySQLConfigure connectionRef={connectionRef} resourceId={resourceId} />
      )
      break
    default:
      node = <div>No Config</div>
      break
  }

  return cloneElement(node, { ref: formRef }) || null
}

export const ResourceFormEditor: FC<ResourceFormEditorProps> = (props) => {
  const { resourceId, back, onSubmit, resourceType: resourceTypeProps } = props
  const { t } = useTranslation()

  const resource = useSelector(selectAllResource).find(
    (i) => i.resourceId === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.resourceType

  const connectionRef = useRef<ConnectionRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function submitForm() {
    formRef.current?.requestSubmit()
    onSubmit && onSubmit()
  }

  return (
    <div css={formContainerStyle}>
      <div>
        {renderResourceNode(resourceType, connectionRef, formRef, props)}
      </div>
      <div css={formFooterStyle}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
          onClick={back}
        >
          <PaginationPreIcon css={backIconStyle} />
          {t("editor.action.form.btn.back")}
        </Button>

        <div css={FormFooterFilling} />

        <Button
          size="medium"
          colorScheme="gray"
          type="button"
          onClick={() => {
            connectionRef.current?.testConnection()
          }}
        >
          {t("editor.action.form.btn.test_connection")}
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={createResourceBtnStyle}
          onClick={submitForm}
        >
          {t("editor.action.form.btn.create_resource")}
        </Button>
      </div>
    </div>
  )
}

ResourceFormEditor.displayName = "ResourceFormEditor"
