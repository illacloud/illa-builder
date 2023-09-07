import {
  MarketAppCard,
  fetchAppList,
  fetchAuthMarketAppList,
} from "@illa-public/market-app"
import {
  PRODUCT_SORT_BY,
  ProductMarketApp,
} from "@illa-public/market-app/service/interface"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { getMarketLinkTemplate } from "@illa-public/utils"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { Divider, Loading, LoadingIcon, useMessage } from "@illa-design/react"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import { getAuthToken } from "@/utils/auth"
import { track } from "@/utils/mixpanelHelper"
import {
  cardListContainerStyle,
  cardListStyle,
  fallbackLoadingStyle,
  loadingStyle,
} from "./style"

export const MarketApps: FC = () => {
  const { t } = useTranslation()

  const [searchParams] = useSearchParams()

  const message = useMessage()

  const fetching = useRef<boolean>()
  const page = useRef<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [marketApps, setMarketApps] = useState<ProductMarketApp[]>([])

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  const [showLine, setShowLine] = useState<boolean>(false)

  const sort =
    (searchParams.get("sort") as PRODUCT_SORT_BY) ?? PRODUCT_SORT_BY.POPULAR
  const keywords = searchParams.get("keywords") ?? ""

  const handleClickCard = (product: ProductMarketApp) => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "card",
      parameter3: "community",
      parameter5: product.app.appId,
    })
    const newUrl = new URL(getMarketLinkTemplate(product.app.appId))
    newUrl.searchParams.set("token", getAuthToken())
    window.open(newUrl, "_blank")
  }

  useEffect(() => {
    const controller = new AbortController()
    setUpdateLoading(true)
    fetchAuthMarketAppList(
      {
        page: 1,
        limit: 40,
        sortedBy: sort as PRODUCT_SORT_BY,
        search: keywords,
      },
      controller.signal,
    )
      .then((res) => {
        setMarketApps(res.data.products)
        setHasMore(res.data.hasMore)
        setUpdateLoading(false)
        return res.data
      })
      .catch((err) => {
        if (err.message === "canceled") {
          return
        }
        setUpdateLoading(false)
      })
    return () => {
      controller.abort()
    }
  }, [keywords, sort])

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : marketApps.length > 0 ? (
    <>
      {showLine && <Divider direction="horizontal" />}
      <div
        css={cardListContainerStyle}
        onScroll={async (event) => {
          const target = event.target as HTMLDivElement
          if (target.scrollTop >= 24) {
            setShowLine(true)
          } else {
            setShowLine(false)
          }
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
              setMarketApps([...marketApps, ...marketAppResp.data.products])
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
              onClick={() => handleClickCard(product)}
              key={product.app.appId}
              app={product.app}
              marketplace={product.marketplace}
              fallbackDescription={t("new_dashboard.desc.no_description")}
            />
          ))}
        </div>
        {hasMore && (
          <div css={loadingStyle}>
            <Loading colorScheme="techPurple" />
          </div>
        )}
      </div>
    </>
  ) : (
    <EmptySearchResult desc={t("dashboard.no-result")} />
  )
}

MarketApps.displayName = "MarketApps"
