import VirtualList from "rc-virtual-list"
import { FC, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useAsyncValue, useNavigate, useParams } from "react-router-dom"
import useMeasure from "react-use-measure"
import {
  Button,
  Empty,
  EmptyIcon,
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
  CARD_HEIGHT,
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
  const { t } = useTranslation()
  const { canEditApp, loading, onCreatedApp } = props
  const { data: appsList } = useAsyncValue() as {
    data: DashboardApp[]
  }
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { teamIdentifier } = useParams()

  const appListInRedux: DashboardApp[] = useSelector(getDashboardApps)
  const [ref, { width, height }] = useMeasure({
    polyfill: ResizeObserver,
  })

  const actualCardsPerRow = useMemo(() => {
    const calculatedWidth = width || window.innerWidth * 0.7 + 16

    const cardsPerRow = Math.floor(
      calculatedWidth / (CARD_WIDTH + CARD_GAP_SIZE),
    )
    const cardAreaWidth = calculatedWidth - (cardsPerRow - 1) * CARD_GAP_SIZE

    return Math.floor(cardAreaWidth / CARD_WIDTH) || 1
  }, [width])

  const finalAppsList = useMemo(() => {
    const appList = canEditApp
      ? appListInRedux
      : appListInRedux.filter((item) => {
          return item.mainlineVersion !== 0
        })
    let rows = []
    for (let i = 0; i < appList.length; i += actualCardsPerRow) {
      rows.push(appList.slice(i, i + actualCardsPerRow))
    }
    return rows
  }, [canEditApp, appListInRedux, actualCardsPerRow])

  useEffect(() => {
    if (Array.isArray(appsList)) {
      dispatch(dashboardAppActions.updateDashboardAppListReducer(appsList))
    }
  }, [appsList, dispatch])

  return (
    <div css={fullWidthStyle} ref={ref}>
      {finalAppsList.length !== 0 && (
        <VirtualList
          style={{ gap: 24 }}
          height={height}
          itemHeight={CARD_HEIGHT + CARD_GAP_SIZE}
          itemKey={(item) => item[0]?.appId}
          data={finalAppsList as DashboardApp[][]}
        >
          {(cardsInThisRow) => {
            return (
              <div
                css={listContainerStyle}
                style={{ height: CARD_HEIGHT + CARD_GAP_SIZE }}
              >
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
        </VirtualList>
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
              <div>{t("new_dashboard.desc.blank")}</div>
              <div>
                <Button
                  colorScheme="grayBlue"
                  loading={loading}
                  leftIcon={<PlusIcon />}
                  onClick={() => {
                    onCreatedApp()
                  }}
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
