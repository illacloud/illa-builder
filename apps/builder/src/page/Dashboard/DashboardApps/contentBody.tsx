import { FC, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue, useNavigate, useParams } from "react-router-dom"
import useMeasure from "react-use-measure"
import {
  Button,
  Empty,
  EmptyIcon,
  List,
  PlusIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
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
  emptyStyle,
  fullWidthStyle,
  listContainerStyle,
} from "./style"

interface AppsContentBodyProps {
  canEditApp: boolean
  loading: boolean
  onCreatedApp: () => void
}

export const AppsContentBody: FC<AppsContentBodyProps> = (props) => {
  const { canEditApp, loading, onCreatedApp } = props
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

  const actualCardsPerRow = useMemo(() => {
    const cardsPerRow = Math.floor(width / (CARD_WIDTH + CARD_GAP_SIZE))
    const cardAreaWidth = width - (cardsPerRow - 1) * CARD_GAP_SIZE

    return Math.floor(cardAreaWidth / CARD_WIDTH)
  }, [width])

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
              index * actualCardsPerRow,
              (index + 1) * actualCardsPerRow,
            )
            if (cardsInThisRow.length === 0) return <></>

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
      {finalAppsList.length === 0 && (
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
              <div>Empty</div>
              <div>
                <Button
                  colorScheme="grayBlue"
                  loading={loading}
                  leftIcon={<PlusIcon />}
                  onClick={() => {
                    onCreatedApp()
                  }}
                >
                  Create your first app
                </Button>
              </div>
            </div>
          }
        />
      )}
    </div>
  )
}
