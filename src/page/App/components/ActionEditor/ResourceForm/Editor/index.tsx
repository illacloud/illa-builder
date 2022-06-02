import { FC, useRef, cloneElement } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import {
  MySQLConfigure,
  RESTAPIConfigure,
} from "@/page/App/components/ActionEditor/Resource"
import { ResourceFormEditorProps, ConnectionRef } from "./interface"
import {
  formContainerStyle,
  formFooterStyle,
  backIconStyle,
  FormFooterFilling,
  createResourceBtnStyle,
} from "./style"

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

  const renderResourceNode = () => {
    let node: JSX.Element

    switch (resourceType) {
      case "REST API":
        node = <RESTAPIConfigure resourceId={resourceId} />
        break
      case "MySQL":
        node = (
          <MySQLConfigure
            connectionRef={connectionRef}
            resourceId={resourceId}
          />
        )
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
    <div css={formContainerStyle}>
      <div>{renderResourceNode()}</div>
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
