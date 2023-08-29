import { MarketAppCard, fetchAppList } from "@illa-public/market-app"
import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"
import { FC, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { Loading, useMessage } from "@illa-design/react"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import { getDashboardMarketAppsList } from "@/redux/dashboard/marketApps/marketAppSelector"
import { dashboardMarketAppActions } from "@/redux/dashboard/marketApps/marketAppSlice"
import { cardListContainerStyle, cardListStyle, loadingStyle } from "./style"


export const MarketApps: FC = () => {
  const { t } = useTranslation()

  const marketApps = useSelector(getDashboardMarketAppsList)

  const [searchParams] = useSearchParams()

  const message = useMessage()

  const fetching = useRef<boolean>()
  const page = useRef<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const dispatch = useDispatch()

  const sort =
    (searchParams.get("sort") as PRODUCT_SORT_BY) ?? PRODUCT_SORT_BY.POPULAR
  const keywords = searchParams.get("keywords") ?? ""

  return marketApps.length > 0 ? (
    <div
      css={cardListContainerStyle}
      onScroll={async (event) => {
        const target = event.target as HTMLDivElement
        if (
          target.scrollHeight - target.scrollTop - target.clientHeight <=
          800
        ) {
          if (fetching.current) {
            return
          }
          if (!hasMore) {
            return
          }
          fetching.current = true
          try {
            const marketAppResp = await fetchAppList({
              page: page.current + 1,
              sortedBy: sort,
              limit: 40,
              search: keywords,
            })
            page.current = page.current + 1
            dispatch(
              dashboardMarketAppActions.addMarketAppListReducer(
                marketAppResp.data.products,
              ),
            )
            if (!marketAppResp.data.hasMore) {
              setHasMore(false)
              return
            }
          } catch (e) {
            message.error({
              content: t("dashboard.message.next-page-error"),
            })
          } finally {
            fetching.current = false
          }
        }
      }}
    >
      <div css={cardListStyle}>
        {marketApps.map((product) => (
          <MarketAppCard
            key={product.app.appID}
            app={product.app}
            marketplace={product.marketplace}
          />
        ))}
      </div>
      {hasMore && <Loading css={loadingStyle} />}
    </div>
  ) : (
    <EmptySearchResult desc={t("dashboard.no-result")} />
  )
}

MarketApps.displayName = "MarketApps"