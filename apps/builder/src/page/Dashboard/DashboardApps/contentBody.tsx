import { FC, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue } from "react-router-dom"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { cardContainerStyle, emptyStyle, fullWidthStyle } from "./style"

interface AppsContentBodyProps {
  canEditApp: boolean
  loading: boolean
  onCreatedApp: () => void
}

export const AppsContentBody: FC<AppsContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEditApp, loading, onCreatedApp } = props
  const { data: appsList } = useAsyncValue() as {
    data: DashboardApp[]
  }
  const dispatch = useDispatch()

  const appListInRedux: DashboardApp[] = useSelector(getDashboardApps)

  const appList = useMemo(() => {
    return canEditApp
      ? appListInRedux
      : appListInRedux.filter((item) => {
          return item.mainlineVersion !== 0
        })
  }, [canEditApp, appListInRedux])

  useEffect(() => {
    if (Array.isArray(appsList)) {
      dispatch(dashboardAppActions.updateDashboardAppListReducer(appsList))
    }
  }, [appsList, dispatch])

  return (
    <div css={fullWidthStyle}>
      {appList.length !== 0 && (
        <div css={cardContainerStyle}>
          {appList?.map((item) => (
            <AppCard
              key={item.appId}
              data-element="listItem"
              appInfo={item}
              canEditApp={canEditApp}
            />
          ))}
        </div>
      )}
      {appList.length === 0 && (
        <Empty
          paddingVertical="120px"
          icon={
            <EmptyIcon
              size="48px"
              color={globalColor(`--${illaPrefix}-grayBlue-02`)}
            />
          }
          description={
            <div css={emptyStyle}>
              <div>{t("new_dashboard.desc.blank")}</div>
              <div>
                <Button
                  colorScheme="grayBlue"
                  loading={loading}
                  leftIcon={<PlusIcon size="10px" />}
                  onClick={onCreatedApp}
                >
                  {t("new_dashboard.button.blank")}
                </Button>
              </div>
            </div>
          }
        />
      )}
    </div>
  )
}
