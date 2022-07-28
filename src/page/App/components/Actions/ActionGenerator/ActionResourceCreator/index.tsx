import { FC, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { Notification } from "@illa-design/notification"
import i18n from "@/i18n/config"
import { Api } from "@/api/base"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { MySQLConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/MySQLConfigure"
import { RESTAPIConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/RestAPIConfigure"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
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

export const ActionResourceCreator: FC<ActionResourceCreatorProps> = (
  props,
) => {
  const {
    resourceId,
    category,
    onBack,
    onCreated,
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
  const [testConnectLoading, setTestConnectLoading] = useState(false)

  const resourceTitle = resourceType
    ? i18n.t(`editor.action.resource.${resourceType}.name`)
    : ""

  function submitForm() {
    formRef.current?.requestSubmit()
  }

  function onTestConnection(data: any) {
    Api.request<{ message: string }>(
      {
        url: "/resources/testConnection",
        method: "POST",
        data,
      },
      ({ data }) => {
        Notification.success({ title: <span>{data.message}</span> })
      },
      ({ data }) => {
        Notification.error({ title: <span>{data.errorMessage}</span> })
      },
      () => {},
      (loading) => setTestConnectLoading(loading),
    )
  }

  function addResourceItem(data: Partial<Resource<ResourceContent>>) {
    Api.request<Resource<ResourceContent>>(
      {
        url: "/resources",
        method: "POST",
        data,
      },
      ({ data }) => {
        dispatch(resourceActions.addResourceItemReducer(data))
        onCreated?.(data.resourceId)
      },
      () => {},
      () => {},
      (loading) => setCreateBtnLoading(loading),
    )
  }

  function updateResourceItem(
    data: Partial<Resource<ResourceContent>>,
    resourceId: string,
  ) {
    Api.request<Resource<ResourceContent>>(
      {
        url: `/resources/${resourceId}`,
        method: "PUT",
        data,
      },
      ({ data }) => {
        dispatch(resourceActions.updateResourceItemReducer(data))
        onCreated?.(resourceId)
      },
      () => {},
      () => {},
      (loading) => setCreateBtnLoading(loading),
    )
  }

  function onSubmitForm(
    data: Partial<Resource<ResourceContent>>,
    resourceId?: string,
  ) {
    if (resourceId) {
      updateResourceItem(data, resourceId)
    } else {
      addResourceItem(data)
    }
  }

  return (
    <div css={formContainerStyle}>
      <div css={formTitleStyle}>
        {i18n.t("editor.action.form.title.configure", { name: resourceTitle })}
      </div>
      <div css={formBodyStyle}>
        {resourceType === "mysql" ? (
          <MySQLConfigure
            ref={formRef}
            connectionRef={connectionRef}
            resourceId={resourceId}
            onTestConnection={onTestConnection}
            onSubmit={(data) => onSubmitForm(data, resourceId)}
          />
        ) : resourceType === "restapi" ? (
          <RESTAPIConfigure
            ref={formRef}
            resourceId={resourceId}
            onSubmit={(data) => onSubmitForm(data, resourceId)}
          />
        ) : null}
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

        {category === "databases" ? (
          <Button
            size="medium"
            colorScheme="gray"
            type="button"
            onClick={() => {
              connectionRef.current?.testConnection()
            }}
            loading={testConnectLoading}
          >
            {i18n.t("editor.action.form.btn.test_connection")}
          </Button>
        ) : null}

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
