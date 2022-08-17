import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DashboardResourceItemMenuProps } from "@/page/Dashboard/components/DashboardResourceItemMenu/interface"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { Button } from "@illa-design/button"
import { MoreIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Api } from "@/api/base"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Message } from "@illa-design/message"
import { Space } from "@illa-design/space"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { ResourceEditor } from "@/page/Dashboard/components/ResourceEditor"

const Item = DropList.Item

export const DashboardResourceItemMenu: FC<DashboardResourceItemMenuProps> = props => {
  const { resourceId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [resourceEditorVisible, setResourceEditorVisible] = useState(false)

  return (
    <>
      <Space direction="horizontal" w="100%" justifyContent="end" size="4px">
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
          position="br"
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
                  Modal.confirm({
                    confirmLoading: confirmLoading,
                    title: t("dashboard.common.delete_title"),
                    content: (
                      <span>{t("dashboard.common.delete_content")}</span>
                    ),
                    cancelText: t("dashboard.common.delete_cancel_text"),
                    okText: t("dashboard.common.delete_ok_text"),
                    okButtonProps: {
                      colorScheme: "red",
                    },
                    closable: true,
                    onOk: () => {
                      return new Promise(resolve => {
                        Api.request<Resource<ResourceContent>>(
                          {
                            url: `/resources/${resourceId}`,
                            method: "DELETE",
                          },
                          response => {
                            dispatch(
                              resourceActions.removeResourceItemReducer(
                                response.data.resourceId,
                              ),
                            )
                            Message.success(
                              t("dashboard.resource.delete_success"),
                            )
                            resolve("finish")
                          },
                          failure => {
                            Message.error(t("dashboard.resource.delete_fail"))
                            resolve("finish")
                          },
                          crash => {
                            Message.error(t("network_error"))
                            resolve("finish")
                          },
                          loading => {
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
      <ResourceEditor
        visible={resourceEditorVisible}
        edit={true}
        resourceId={resourceId}
        onClose={() => {
          setResourceEditorVisible(false)
        }}
      />
    </>
  )
}

DashboardResourceItemMenu.displayName = "DashboardResourceItemMenu"
