import { Api } from "@/api/base"
import { DashboardResourceItemMenuProps } from "@/page/Dashboard/components/DashboardResourceItemMenu/interface"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import {
  Dropdown,
  DropList,
  Button,
  MoreIcon,
  globalColor,
  illaPrefix,
  Modal,
  useModal,
  Space,
  useMessage,
} from "@illa-design/react"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

const Item = DropList.Item

export const DashboardResourceItemMenu: FC<DashboardResourceItemMenuProps> = (
  props,
) => {
  const { resourceId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [resourceEditorVisible, setResourceEditorVisible] = useState(false)

  const resource = useSelector((state: RootState) => {
    return state.resource.find((item) => item.resourceId === resourceId)!!
  })

  const message = useMessage()
  const modal = useModal()

  return (
    <>
      <Space direction="horizontal" w="100%" align="end" size="4px">
        <Button
          css={buttonVisibleStyle}
          className="dashboardResourceEditButton"
          colorScheme="techPurple"
          onClick={() => {
            setResourceEditorVisible(true)
          }}
        >
          {t("edit")}
        </Button>
        <Dropdown
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
          dropList={
            <DropList width={"184px"}>
              <Item
                key={"edit"}
                title={t("edit")}
                onClick={() => {
                  setResourceEditorVisible(true)
                }}
              />
              <Item
                key={"delete"}
                title={t("dashboard.common.delete")}
                fontColor={globalColor(`--${illaPrefix}-red-03`)}
                onClick={() => {
                  modal.show({
                    okLoading: confirmLoading,
                    title: t("dashboard.common.delete_title"),
                    children: t("dashboard.common.delete_content"),
                    cancelText: t("dashboard.common.delete_cancel_text"),
                    okText: t("dashboard.common.delete_ok_text"),
                    okButtonProps: {
                      colorScheme: "red",
                    },
                    closable: false,
                    onOk: () => {
                      return new Promise((resolve) => {
                        Api.request<Resource<ResourceContent>>(
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
                            resolve("finish")
                          },
                          (failure) => {
                            message.error({
                              content: t("dashboard.resource.delete_fail"),
                            })
                            resolve("finish")
                          },
                          (crash) => {
                            message.error({
                              content: t("network_error"),
                            })
                            resolve("finish")
                          },
                          (loading) => {
                            setConfirmLoading(loading)
                          },
                        )
                      })
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
        closable
        withoutLine
        withoutPadding
        title={getResourceNameFromResourceType(resource.resourceType)}
        onCancel={() => {
          setResourceEditorVisible(false)
        }}
      >
        <div css={modalContentStyle}>
          <ResourceCreator
            resourceId={resourceId}
            onBack={() => {
              setResourceEditorVisible(false)
            }}
            onFinished={() => {
              setResourceEditorVisible(false)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

DashboardResourceItemMenu.displayName = "DashboardResourceItemMenu"
