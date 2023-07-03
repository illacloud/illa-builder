import { FC, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue, useNavigate, useParams } from "react-router-dom"
import useMeasure from "react-use-measure"
import { Empty, List } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { track } from "@/utils/mixpanelHelper"
import {
  CARD_GAP_SIZE,
  CARD_WIDTH,
  fullWidthStyle,
  listContainerStyle,
} from "./style"

interface AppsContentBodyProps {
  canEditApp: boolean
}

export const AppsContentBody: FC<AppsContentBodyProps> = (props) => {
  const { canEditApp } = props
  const { data: appsList } = useAsyncValue() as {
    data: DashboardApp[]
  }
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { teamIdentifier } = useParams()

  const appListInRedux: DashboardApp[] = useSelector(getDashboardApps)

  const [ref, { width }] = useMeasure({
    polyfill: ResizeObserver,
  })
  const cardsPerRow = Math.floor(width / (CARD_WIDTH + CARD_GAP_SIZE))

  useEffect(() => {
    if (Array.isArray(appsList)) {
      dispatch(dashboardAppActions.updateDashboardAppListReducer(appsList))
    }
  }, [appsList, dispatch])

  const finalAppsList = useMemo(() => {
    if (canEditApp) return appListInRedux
    return appListInRedux.filter((item) => {
      return item.mainlineVersion !== 0
    })
  }, [canEditApp, appListInRedux])

  return (
    <div css={fullWidthStyle} ref={ref}>
      {finalAppsList.length !== 0 && (
        <List
          w={"100%"}
          h={"100%"}
          ov={"auto"}
          data={finalAppsList}
          bordered={false}
          hoverable={true}
          renderRaw
          render={(_item, index) => {
            const cardsInThisRow = finalAppsList.slice(
              index * cardsPerRow,
              (index + 1) * cardsPerRow,
            )

            return (
              <div css={listContainerStyle}>
                {cardsInThisRow?.map((item) => (
                  <AppCard
                    key={item.appId}
                    data-element="listItem"
                    appInfo={item}
                    canEditApp={canEditApp}
                    onClick={() => {
                      if (canEditApp) {
                        navigate(`/${teamIdentifier}/app/${item.appId}`)
                      } else if (item.mainlineVersion !== 0) {
                        navigate(`/${teamIdentifier}/deploy/app/${item.appId}`)
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (
                        (e.target as HTMLDivElement).dataset?.element !==
                        "listItem"
                      )
                        return
                      canEditApp &&
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                          { element: "app_edit", parameter5: item.appId },
                        )
                      item.mainlineVersion !== 0 &&
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                          { element: "app_launch", parameter5: item.appId },
                        )
                    }}
                  />
                ))}
              </div>
            )
          }}
          renderKey={(item) => {
            return item.appId
          }}
        />
      )}
      {finalAppsList.length == 0 && <Empty paddingVertical="120px" />}
    </div>
  )
}
