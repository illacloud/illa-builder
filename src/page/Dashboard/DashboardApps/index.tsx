import { FC, useEffect, useState } from "react"
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
import { LoadingIcon, MoreIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { Empty } from "@illa-design/empty"
import { useDispatch, useSelector } from "react-redux"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { Result } from "@illa-design/result"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useNavigate } from "react-router-dom"
import { Api } from "@/api/base"
import { Tooltip } from "@illa-design/tooltip"
import { Notification } from "@illa-design/notification"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorState, setErrorState] = useState(false)

  const [createLoading, setCreateNewLoading] = useState(false)

  useEffect(() => {
    Api.request<DashboardApp[]>(
      {
        url: "/dashboard/apps",
        method: "GET",
      },
      (response) => {
        dispatch(
          dashboardAppActions.updateDashboardAppListReducer(response.data),
        )
      },
      (response) => { },
      (error) => { },
      (loading) => {
        setLoading(loading)
      },
      (errorState) => {
        setErrorState(errorState)
      },
    )
  }, [])

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
                url: "/dashboard/app",
                method: "POST",
              },
              (response) => {
                dispatch(
                  dashboardAppActions.addDashboardAppReducer({
                    app: response.data,
                  }),
                )
                navigate(`/editor/${response.data.appId}`)
              },
              (response) => { },
              (error) => { },
              (loading) => {
                setCreateNewLoading(loading)
              },
              (errorState) => {
                if (errorState) {
                  Notification.error({ title: t("create_fail") })
                }
              },
            )
          }}
        >
          {t("create_new")}
        </Button>
      </div>
      <Divider direction="horizontal" />
      {!loading && !errorState && appsList && appsList.length != 0 && (
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
                        navigate(`/editor/${item.appId}`)
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
      {!loading && !errorState && appsList && appsList.length == 0 && <Empty />}
      {!loading && errorState && (
        <Result status="error" title={t("network_error")} />
      )}
      {loading && (
        <LoadingIcon
          spin
          color={globalColor(`--${illaPrefix}-techPurple-01`)}
        />
      )}
    </div>
  )
}

DashboardApps.displayName = "DashboardApps"
