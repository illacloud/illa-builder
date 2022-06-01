import { FC, useState } from "react"
import {
  appsContainerStyle,
  itemExtraContainerStyle,
  itemMenuButtonStyle,
  listTitleContainerStyle,
  listTitleStyle,
  menuButtonStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { List, ListItem, ListItemMeta } from "@illa-design/list"
import { MoreIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { Empty } from "@illa-design/empty"
import { useDispatch, useSelector } from "react-redux"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { useNavigate } from "react-router-dom"
import { Api } from "@/api/base"
import { Tooltip } from "@illa-design/tooltip"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"
import { Message } from "@illa-design/message"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)

  const [createLoading, setCreateNewLoading] = useState(false)

  return (
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <span css={listTitleStyle}>{t("apps")}</span>
        <Button colorScheme="gray">{t("share")}</Button>
        <Button
          _css={menuButtonStyle}
          loading={createLoading}
          colorScheme="techPurple"
          onClick={() => {
            Api.request<DashboardApp>(
              {
                url: "/dashboard/apps",
                method: "POST",
              },
              (response) => {
                dispatch(
                  dashboardAppActions.addDashboardAppReducer({
                    app: response.data,
                  }),
                )
                navigate(`/app/${response.data.appId}`)
              },
              (response) => {},
              (error) => {},
              (loading) => {
                setCreateNewLoading(loading)
              },
              (errorState) => {
                if (errorState) {
                  Message.error({ content: t("create_fail") })
                }
              },
            )
          }}
        >
          {t("create_new")}
        </Button>
      </div>
      <Divider direction="horizontal" />
      {appsList.length != 0 && (
        <List
          size="medium"
          data={appsList}
          bordered={false}
          hoverable={true}
          render={(item) => {
            return (
              <ListItem
                extra={
                  <div css={itemExtraContainerStyle}>
                    <Button
                      colorScheme="techPurple"
                      onClick={() => {
                        navigate(`/app/${item.appId}`)
                      }}
                    >
                      {t("edit")}
                    </Button>
                    <Tooltip
                      trigger="click"
                      colorScheme="white"
                      showArrow={false}
                      position="br"
                      withoutPadding
                      clickOutsideToClose
                      closeOnInnerClick
                      content={<DashboardItemMenu appId={item.appId} />}
                    >
                      <Button
                        _css={itemMenuButtonStyle}
                        colorScheme="grayBlue"
                        leftIcon={<MoreIcon />}
                      />
                    </Tooltip>
                  </div>
                }
              >
                <ListItemMeta
                  title={item.appName}
                  description={item.appActivity}
                />
              </ListItem>
            )
          }}
          renderKey={(item) => {
            return item.appId
          }}
        />
      )}
      {appsList && appsList.length == 0 && <Empty paddingVertical="120px" />}
    </div>
  )
}

DashboardApps.displayName = "DashboardApps"
