import { FC, useEffect, useState } from "react"
import {
  applyAppsContainerCss,
  applyItemExtraContainer,
  applyItemMenuButtonCss,
  applyListTitleContainerCss,
  applyListTitleCss,
  applyMenuButtonCss,
} from "./style"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { List, ListItem, ListItemMeta } from "@illa-design/list"
import { LoadingIcon, MoreIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { DashboardApp } from "@/redux/dashboard/apps/appState"
import { Empty } from "@illa-design/empty"
import { useDispatch, useSelector } from "react-redux"
import { getDashboardApps } from "@/redux/dashboard/apps/appSelector"
import { Result } from "@illa-design/result"
import appSlice from "@/redux/dashboard/apps/appSlice"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useNavigate } from "react-router-dom"
import { Api } from "@/api/base"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    Api.request<DashboardApp[]>(
      {
        url: "/dashboard/apps",
        method: "GET",
      },
      (response) => {
        dispatch(appSlice.actions.updateAppListReducer(response.data))
      },
      (response) => {},
      (error) => {},
      (loading) => {
        setLoading(loading)
      },
      (errorState) => {
        setErrorState(errorState)
      },
    )
  }, [])

  return (
    <div css={applyAppsContainerCss}>
      <div css={applyListTitleContainerCss}>
        <span css={applyListTitleCss}>{t("apps")}</span>
        <Button colorScheme="gray">{t("share")}</Button>
        <Button _css={applyMenuButtonCss} colorScheme="techPurple">
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
                  <div css={applyItemExtraContainer}>
                    <Button
                      colorScheme="techPurple"
                      onChange={() => {
                        navigate(`editor/${item.appId}`)
                      }}
                    >
                      {t("edit")}
                    </Button>
                    <Button
                      _css={applyItemMenuButtonCss}
                      colorScheme="grayBlue"
                      leftIcon={<MoreIcon />}
                      onClick={() => {}}
                    />
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
