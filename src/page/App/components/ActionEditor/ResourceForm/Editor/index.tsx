import { FC, useRef, cloneElement, RefObject, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { Notification } from "@illa-design/notification"
import { Api } from "@/api/base"
import { Resource } from "@/redux/currentApp/resource/resourceState"
import { resourceActions } from "@/redux/currentApp/resource/resourceSlice"
import { selectAllResource } from "@/redux/currentApp/resource/resourceSelector"
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
  formFooterFillingStyle,
  createResourceBtnStyle,
  formTitleStyle,
} from "./style"

const renderResourceNode = (
  resourceType: ResourceType | undefined,
  connectionRef: RefObject<ConnectionRef>,
  formRef: RefObject<HTMLFormElement>,
  onSubmitForm: (data: any) => void,
  onTestConnection: (data: any) => void,
  props: ResourceFormEditorProps,
) => {
  let node: JSX.Element
  const { resourceId } = props

  switch (resourceType) {
    case "restapi":
      node = (
        <RESTAPIConfigure resourceId={resourceId} onSubmit={onSubmitForm} />
      )
      break
    case "mysql":
      node = (
        <MySQLConfigure
          connectionRef={connectionRef}
          resourceId={resourceId}
          onSubmit={onSubmitForm}
          onTestConnection={onTestConnection}
        />
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
  const dispatch = useDispatch()
  const resource = useSelector(selectAllResource).find(
    (i) => i.resourceId === resourceId,
  )
  // if receive `resourceTypeProps` means add new
  const resourceType = resourceTypeProps || resource?.resourceType

  const connectionRef = useRef<ConnectionRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [createBtnLoading, setCreateBtnLoading] = useState(false)
  const [testConnectionLoading, setTestConnectionLoading] = useState(false)

  function submitForm() {
    formRef.current?.requestSubmit()
  }

  function onSubmitForm(data: any, resourceId?: string) {
    if (resourceId) {
      Api.request<Resource>(
        {
          url: `/resources/${resourceId}`,
          method: "PUT",
          data,
        },
        ({ data }) => {
          dispatch(resourceActions.updateResourceItemReducer(data))
          onSubmit?.(resourceId)
        },
        () => { },
        () => { },
        (loading) => setCreateBtnLoading(loading),
      )
      return
    }

    Api.request<Resource>(
      {
        url: "/resources",
        method: "POST",
        data,
      },
      ({ data }) => {
        dispatch(resourceActions.addResourceItemReducer(data))
        onSubmit?.(data.resourceId)
      },
      () => { },
      () => { },
      (loading) => setCreateBtnLoading(loading),
    )
  }

  function onTestConnection(data: any) {
    Api.request<string>(
      {
        url: "/resources/testConnection",
        method: "POST",
        data,
      },
      ({ data }) => {
        Notification.success({ title: <span>{data}</span> })
      },
      ({ data }) => {
        Notification.error({ title: <span>{data}</span> })
      },
      () => { },
      (loading) => setTestConnectionLoading(loading),
    )
  }

  return (
    <div css={formContainerStyle}>
      <div css={formTitleStyle}>Configure</div>
      <div>
        {renderResourceNode(
          resourceType,
          connectionRef,
          formRef,
          onSubmitForm,
          onTestConnection,
          props,
        )}
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
          {t("editor.action.form.btn.test_connection")}
        </Button>

        <Button
          size="medium"
          colorScheme="techPurple"
          css={createResourceBtnStyle}
          onClick={submitForm}
          loading={createBtnLoading}
        >
          {resourceId
            ? t("editor.action.form.btn.save_changes")
            : t("editor.action.form.btn.create_resource")}
        </Button>
      </div>
    </div>
  )
}

ResourceFormEditor.displayName = "ResourceFormEditor"
