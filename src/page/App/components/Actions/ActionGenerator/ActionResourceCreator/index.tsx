import { FC, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { ActionResourceCreatorProps, ConnectionRef } from "./interface"
import {
  formContainerStyle,
  formFooterStyle,
  backIconStyle,
  formFooterFillingStyle,
  createResourceBtnStyle,
  formTitleStyle,
  formBodyStyle,
} from "./style"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import i18n from "@/i18n/config"
import { MySQLConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/MySQLConfigure"
import { RESTAPIConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/RestAPIConfigure"

export const ActionResourceCreator: FC<ActionResourceCreatorProps> = (
  props,
) => {
  const {
    resourceId,
    onBack,
    onSubmit,
    resourceType: resourceTypeProps,
  } = props
  const dispatch = useDispatch()
  const resource = useSelector(getActionList).find(
    (i) => i.resourceId === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.actionType

  const connectionRef = useRef<ConnectionRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [createBtnLoading, setCreateBtnLoading] = useState(false)
  const [testConnectionLoading, setTestConnectionLoading] = useState(false)

  const resourceTitle = resourceType
    ? i18n.t(`editor.action.resource.${resourceType}.name`)
    : ""

  function submitForm() {
    formRef.current?.requestSubmit()
  }

  console.log({ resourceTitle }, resourceTypeProps, resource?.actionType)

  return (
    <div css={formContainerStyle}>
      <div css={formTitleStyle}>
        {i18n.t("editor.action.form.title.configure", { name: resourceTitle })}
      </div>
      <div css={formBodyStyle}>
        {resourceType === "mysql" ? (
          <MySQLConfigure
            connectionRef={connectionRef}
            resourceId={resourceId}
          />
        ) : resourceType === "restapi" ? (
          <RESTAPIConfigure />
        ) : null}
        {/*{renderResourceNode(*/}
        {/*    resourceType,*/}
        {/*    connectionRef,*/}
        {/*    formRef,*/}
        {/*    onSubmitForm,*/}
        {/*    onTestConnection,*/}
        {/*    props,*/}
        {/*)}*/}
      </div>
      <div css={formFooterStyle}>
        {onBack && (
          <Button
            variant="text"
            size="medium"
            colorScheme="grayBlue"
            type="button"
            onClick={onBack}
          >
            <PaginationPreIcon css={backIconStyle} />
            {i18n.t("back")}
          </Button>
        )}

        <div css={formFooterFillingStyle} />

        <Button
          size="medium"
          colorScheme="gray"
          type="button"
          onClick={() => {
            connectionRef.current?.testConnection()
          }}
          loading={testConnectionLoading}
        >
          {i18n.t("editor.action.form.btn.test_connection")}
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={createResourceBtnStyle}
          onClick={submitForm}
          loading={createBtnLoading}
        >
          {resourceId
            ? i18n.t("editor.action.form.btn.save_changes")
            : i18n.t("editor.action.form.btn.create_resource")}
        </Button>
      </div>
    </div>
  )
}

ActionResourceCreator.displayName = "ActionResourceCreator"
