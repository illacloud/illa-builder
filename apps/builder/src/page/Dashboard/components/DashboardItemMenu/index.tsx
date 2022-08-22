import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { Space } from "@illa-design/space"
import { Button } from "@illa-design/button"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { MoreIcon } from "@illa-design/icon"
import { Modal } from "@illa-design/modal"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { Message } from "@illa-design/message"
import { RootState } from "@/store"
import { RenameModal } from "@/page/Dashboard/components/RenameModal"
import { DuplicateModal } from "@/page/Dashboard/components/DuplicateModal"
import { useNavigate } from "react-router-dom"

const Item = DropList.Item

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const { appId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )!!
  })

  const [renameVisible, setRenameVisible] = useState(false)
  const [duplicateVisible, setDuplicateVisible] = useState(false)

  return (
    <>
      <Space direction="horizontal" w="100%" justifyContent="end" size="4px">
        <Button
          css={buttonVisibleStyle}
          className="dashboardAppEditButton"
          colorScheme="techPurple"
          onClick={() => {
            navigate(`/app/${app.appId}`)
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
                key={"rename"}
                title={t("rename")}
                onClick={() => {
                  setRenameVisible(true)
                }}
              />
              <Item
                key={"duplicate"}
                title={t("duplicate")}
                onClick={() => {
                  setDuplicateVisible(true)
                }}
              />
              <Item
                key={"delete"}
                title={t("dashboard.common.delete")}
                fontColor={globalColor(`--${illaPrefix}-red-03`)}
                onClick={() => {
                  Modal.confirm({
                    w: "496px",
                    title: t("dashboard.common.delete_title"),
                    content: t("dashboard.common.delete_content"),
                    cancelText: t("dashboard.common.delete_cancel_text"),
                    okText: t("dashboard.common.delete_ok_text"),
                    okButtonProps: {
                      colorScheme: "red",
                    },
                    closable: false,
                    onOk: () => {
                      Api.request<DashboardApp>(
                        {
                          url: `/apps/${appId}`,
                          method: "DELETE",
                        },
                        (response) => {
                          dispatch(
                            dashboardAppActions.removeDashboardAppReducer(
                              response.data.appId,
                            ),
                          )
                          Message.success(t("dashboard.app.trash_success"))
                        },
                        (failure) => {
                          Message.success(t("dashboard.app.trash_failure"))
                        },
                        (crash) => {
                          Message.error(t("network_error"))
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
      <RenameModal
        appId={app.appId}
        visible={renameVisible}
        onVisibleChange={(visible) => {
          setRenameVisible(visible)
        }}
      />
      <DuplicateModal
        appId={app.appId}
        visible={duplicateVisible}
        onVisibleChange={(visible) => {
          setDuplicateVisible(visible)
        }}
      />
    </>
  )
}

DashboardItemMenu.displayName = "DashboardItemMenu"
