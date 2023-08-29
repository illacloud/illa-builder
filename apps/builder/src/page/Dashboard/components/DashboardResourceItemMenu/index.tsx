import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { FC, useCallback, useEffect, useState } from "react"
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
  useMessage,
  useModal,
} from "@illa-design/react"
import { DashboardResourceItemMenuProps } from "@/page/Dashboard/components/DashboardResourceItemMenu/interface"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchDeleteResource } from "@/services/resource"
import { RootState } from "@/store"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { resourceContextHelper, track } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"

const Item = DropListItem

export const DashboardResourceItemMenu: FC<DashboardResourceItemMenuProps> = (
  props,
) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [resourceEditorVisible, setResourceEditorVisible] = useState(false)

  const resource = useSelector((state: RootState) => {
    return state.resource.find((item) => item.resourceID === resourceID)!!
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
      { element: "resource_more", parameter5: resourceID },
    )
  }, [resourceID])

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
  const handleClickOkOnDeleteModal = useCallback(async () => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
      { element: "resource_more_delete", parameter5: resourceID },
    )
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
      {
        element: "resource_more_delete_modal",
        parameter5: resourceID,
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
      onOk: async () => {
        modal.update(modalId, {
          okLoading: true,
        })
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
          {
            element: "resource_more_delete_modal_delete",
            parameter5: resourceID,
          },
        )
        try {
          const response = await fetchDeleteResource(resourceID)
          dispatch(
            resourceActions.removeResourceItemReducer(response.data.resourceID),
          )
          message.success({
            content: t("dashboard.resource.delete_success"),
          })
          modal.close(modalId)
        } catch (e) {
          if (isILLAAPiError(e)) {
            message.error({
              content: t("dashboard.resource.delete_fail"),
            })
          } else {
            message.error({
              content: t("network_error"),
            })
          }
        }
        modal.update(modalId, {
          okLoading: false,
        })
      },
      onCancel: () => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
          {
            element: "resource_more_delete_modal_close",
            parameter5: resourceID,
          },
        )
      },
    })
  }, [dispatch, message, modal, resourceID, t])

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
              { element: "resource_more_click", parameter5: resourceID },
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
                    { element: "resource_more_edit", parameter5: resourceID },
                  )
                }}
              />
              <Item
                value="delete"
                key={"delete"}
                title={t("dashboard.common.delete")}
                deleted
                onClick={handleClickOkOnDeleteModal}
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
              resourceID={resourceID}
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
