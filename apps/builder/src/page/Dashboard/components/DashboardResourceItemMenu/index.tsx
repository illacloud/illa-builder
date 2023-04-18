import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  Modal,
  MoreIcon,
  Space,
  globalColor,
  illaPrefix,
  useMessage,
  useModal,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { DashboardResourceItemMenuProps } from "@/page/Dashboard/components/DashboardResourceItemMenu/interface"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { resourceContextHelper, track } from "@/utils/mixpanelHelper"

const Item = DropListItem

export const DashboardResourceItemMenu: FC<DashboardResourceItemMenuProps> = (
  props,
) => {
  const { resourceId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [resourceEditorVisible, setResourceEditorVisible] = useState(false)

  const resource = useSelector((state: RootState) => {
    return state.resource.find((item) => item.resourceId === resourceId)!!
  })

  const closeResourceEditor = (element: string) => {
    setResourceEditorVisible(false)
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
      {
        element,
        parameter1: "resource_edit",
        parameter5: resource.resourceType,
      },
    )
  }

  const message = useMessage()
  const modal = useModal()

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
      { element: "resource_more", parameter5: resourceId },
    )
  }, [resourceId])

  useEffect(() => {
    resourceEditorVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
        {
          element: "resource_configure_modal",
          parameter1: "resource_edit",
          parameter5: resource.resourceType,
        },
      )
  }, [resource.resourceType, resourceEditorVisible])

  return (
    <>
      <Space direction="horizontal" w="100%" align="end" size="4px">
        <Button
          css={buttonVisibleStyle}
          className="dashboardResourceEditButton"
          colorScheme="techPurple"
          onClick={() => {
            setResourceEditorVisible(true)
            track(
              ILLA_MIXPANEL_EVENT_TYPE.CLICK,
              ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
              { element: "resource_more_click", parameter5: resourceId },
            )
          }}
        >
          {t("edit")}
        </Button>
        <Dropdown
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
          dropList={
            <DropList w="184px">
              <Item
                value="edit"
                key="edit"
                title={t("edit")}
                onClick={() => {
                  setResourceEditorVisible(true)
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                    { element: "resource_more_edit", parameter5: resourceId },
                  )
                }}
              />
              <Item
                value="delete"
                key={"delete"}
                title={t("dashboard.common.delete")}
                deleted
                onClick={() => {
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                    { element: "resource_more_delete", parameter5: resourceId },
                  )
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                    {
                      element: "resource_more_delete_modal",
                      parameter5: resourceId,
                    },
                  )
                  const modalId = modal.show({
                    blockOkHide: true,
                    title: t("dashboard.common.delete_title"),
                    children: t("dashboard.common.delete_content"),
                    cancelText: t("dashboard.common.delete_cancel_text"),
                    okText: t("dashboard.common.delete_ok_text"),
                    okButtonProps: {
                      colorScheme: "red",
                    },
                    closable: false,
                    onOk: () => {
                      track(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                        {
                          element: "resource_more_delete_modal_delete",
                          parameter5: resourceId,
                        },
                      )
                      BuilderApi.teamRequest<Resource<ResourceContent>>(
                        {
                          url: `/resources/${resourceId}`,
                          method: "DELETE",
                        },
                        (response) => {
                          dispatch(
                            resourceActions.removeResourceItemReducer(
                              response.data.resourceId,
                            ),
                          )
                          message.success({
                            content: t("dashboard.resource.delete_success"),
                          })
                          modal.close(modalId)
                        },
                        (failure) => {
                          message.error({
                            content: t("dashboard.resource.delete_fail"),
                          })
                        },
                        (crash) => {
                          message.error({
                            content: t("network_error"),
                          })
                        },
                        (loading) => {
                          modal.update(modalId, {
                            okLoading: loading,
                          })
                        },
                      )
                    },
                    onCancel: () => {
                      track(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                        {
                          element: "resource_more_delete_modal_close",
                          parameter5: resourceId,
                        },
                      )
                    },
                  })
                }}
              />
            </DropList>
          }
        >
          <Button
            ml="4px"
            colorScheme="grayBlue"
            leftIcon={<MoreIcon size="14px" />}
          />
        </Dropdown>
      </Space>
      <Modal
        w="696px"
        visible={resourceEditorVisible}
        footer={false}
        maskClosable={false}
        closable
        withoutLine
        withoutPadding
        title={getResourceNameFromResourceType(resource.resourceType)}
        onCancel={() => {
          closeResourceEditor("resource_configure_close")
        }}
      >
        <div css={modalContentStyle}>
          <MixpanelTrackProvider
            pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE}
            basicTrack={resourceContextHelper("resource_edit")}
          >
            <ResourceCreator
              resourceId={resourceId}
              onBack={() => {
                closeResourceEditor("resource_configure_back")
              }}
              onFinished={() => {
                setResourceEditorVisible(false)
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                  {
                    element: "resource_configure_save",
                    parameter1: "resource_edit",
                    parameter5: resource.resourceType,
                  },
                )
              }}
            />
          </MixpanelTrackProvider>
        </div>
      </Modal>
    </>
  )
}

DashboardResourceItemMenu.displayName = "DashboardResourceItemMenu"
