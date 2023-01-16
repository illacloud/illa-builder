import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  Space,
  globalColor,
  illaPrefix,
  useMessage,
  useModal,
} from "@illa-design/react"
import { Api } from "@/api/base"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { DuplicateModal } from "@/page/Dashboard/components/DuplicateModal"
import { RenameModal } from "@/page/Dashboard/components/RenameModal"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { RootState } from "@/store"

const Item = DropListItem

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
  const message = useMessage()
  const modal = useModal()

  return (
    <>
      <Space
        direction="horizontal"
        w="100%"
        justifyContent="end"
        size="4px"
        alignItems="center"
      >
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
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
          dropList={
            <DropList w="184px">
              <Item
                value="rename"
                key="rename"
                title={t("rename")}
                onClick={() => {
                  setRenameVisible(true)
                }}
              />
              <Item
                key="duplicate"
                value="duplicate"
                title={t("duplicate")}
                onClick={() => {
                  setDuplicateVisible(true)
                }}
              />
              <Item
                key="delete"
                value="delete"
                title={t("dashboard.common.delete")}
                fontColor={globalColor(`--${illaPrefix}-red-03`)}
                onClick={() => {
                  const modalId = modal.show({
                    w: "496px",
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
                          message.success({
                            content: t("dashboard.app.trash_success"),
                          })
                          modal.close(modalId)
                        },
                        (failure) => {
                          message.success({
                            content: t("dashboard.app.trash_failure"),
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
