import { FC, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { Notification } from "@illa-design/notification"
import i18n from "@/i18n/config"
import { Api } from "@/api/base"
import { MySQLConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/MySQLConfigure"
import { RESTAPIConfigure } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/RestAPIConfigure"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { ActionResourceCreatorProps, ConnectionRef } from "./interface"
import {
  backIconStyle,
  createResourceBtnStyle,
  formBodyStyle,
  formContainerStyle,
  formFooterFillingStyle,
  formFooterStyle,
} from "./style"
import { Message } from "@illa-design/message"
import { getAllResources } from "@/redux/resource/resourceSelector"

export const ActionResourceCreator: FC<ActionResourceCreatorProps> = (
  props,
) => {
  const {
    resourceId,
    onBack,
    onCreated,
    resourceType: resourceTypeProps,
  } = props
  const dispatch = useDispatch()
  const resource = useSelector(getAllResources).find(
    (i) => i.resourceId === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.resourceType
  const connectionRef = useRef<ConnectionRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [createBtnLoading, setCreateBtnLoading] = useState(false)
  const [testConnectLoading, setTestConnectLoading] = useState(false)

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
        Message.success(
          i18n.t("editor.action.action_list.message.success_created"),
        )
        dispatch(resourceActions.addResourceItemReducer(data))
        onCreated?.(data.resourceId)
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
      },
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
        Message.success(
          i18n.t("editor.action.action_list.message.success_saved"),
        )
        dispatch(resourceActions.updateResourceItemReducer(data))
        onCreated?.(resourceId)
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
      },
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

        {resourceType !== "restapi" && (
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
        )}

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
