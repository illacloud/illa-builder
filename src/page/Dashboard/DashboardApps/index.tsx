import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Button } from "@illa-design/button"
import { List, ListItem, ListItemMeta } from "@illa-design/list"
import { MoreIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { Empty } from "@illa-design/empty"
import { Message } from "@illa-design/message"
import { Modal } from "@illa-design/modal"
import { Input } from "@illa-design/input"
import { Dropdown } from "@illa-design/dropdown"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { modalStyle } from "@/page/Dashboard/components/DashboardItemMenu/style"
import {
  appsContainerStyle,
  itemExtraContainerStyle,
  itemMenuButtonStyle,
  listTitleContainerStyle,
  listTitleStyle,
  menuButtonStyle,
  hoverableStyle,
  listItemStyle,
  editButtonStyle,
  listItemTitleStyle,
} from "./style"

dayjs.extend(utc)

export const DashboardApps: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)

  const [createLoading, setCreateNewLoading] = useState(false)

  let confirmVal = ""

  return (
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <span css={listTitleStyle}>{t("all_apps")}</span>
        <Button
          colorScheme="gray"
          onClick={() => {
            Message.success({ content: t("link_copied") })
          }}
        >
          {t("share")}
        </Button>
        <Button
          _css={menuButtonStyle}
          loading={createLoading}
          colorScheme="techPurple"
          onClick={() => {
            Modal.confirm({
              _css: modalStyle,
              content: (
                <Input
                  onChange={(res) => {
                    confirmVal = res
                  }}
                />
              ),
              title: t("dashboard.app.create_app"),
              okButtonProps: {
                colorScheme: "techPurple",
              },
              closable: true,
              onOk: () => {
                Api.request<DashboardApp>(
                  {
                    url: "/apps",
                    method: "POST",
                    data: {
                      appName: confirmVal,
                    },
                  },
                  (response) => {
                    dispatch(
                      dashboardAppActions.addDashboardAppReducer({
                        app: response.data,
                      }),
                    )
                    navigate(`/app/${response.data.appId}`)
                  },
                  (response) => { },
                  (error) => { },
                  (loading) => {
                    setCreateNewLoading(loading)
                  },
                  (errorState) => {
                    if (errorState) {
                      Message.error({ content: t("create_fail") })
                    }
                  },
                )
              },
            })
          }}
        >
          {t("create_new_app")}
        </Button>
      </div>
      <Divider direction="horizontal" />
      {appsList.length !== 0 && (
        <List
          size="medium"
          data={appsList}
          bordered={false}
          hoverable={true}
          renderRaw
          render={(item, index) => {
            return (
              <ListItem
                _css={listItemStyle}
                extra={
                  <div css={itemExtraContainerStyle}>
                    <Button
                      colorScheme="techPurple"
                      onClick={() => {
                        navigate(`/app/${item.currentVersionId}`)
                      }}
                      _css={editButtonStyle}
                      title="editButton"
                    >
                      {t("edit")}
                    </Button>
                    <Dropdown
                      position="br"
                      trigger="click"
                      dropList={
                        <DashboardItemMenu
                          appId={item.appId}
                          appName={item.appName}
                          appIndex={index}
                        />
                      }
                    >
                      <Button
                        _css={itemMenuButtonStyle}
                        colorScheme="grayBlue"
                        leftIcon={<MoreIcon size="14px" />}
                      />
                    </Dropdown>
                  </div>
                }
              >
                <ListItemMeta
                  css={hoverableStyle}
                  title={<span css={listItemTitleStyle}>{item.appName}</span>}
                  description={`${item.lastModifiedBy} ${dayjs
                    .utc(item.lastModifiedAt)
                    .format("YYYY-MM-DD HH:mm:ss")}`}
                  onClick={() => {
                    navigate(`/app/${item.currentVersionId}`)
                  }}
                />
              </ListItem>
            )
          }}
          renderKey={(item) => {
            return item.appId
          }}
        />
      )}
      {appsList.length == 0 && <Empty paddingVertical="120px" />}
    </div>
  )
}

DashboardApps.displayName = "DashboardApps"
