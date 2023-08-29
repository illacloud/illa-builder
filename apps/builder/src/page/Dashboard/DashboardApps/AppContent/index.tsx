import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"
import { isCloudVersion } from "@illa-public/utils"
import { FC, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Await, useLoaderData, useSearchParams } from "react-router-dom"
import { LoadingIcon, RadioGroup, getColor } from "@illa-design/react"
import { MarketApps } from "@/page/Dashboard/DashboardApps/MarketApps"
import { TeamApps } from "@/page/Dashboard/DashboardApps/TeamApps"
import { DashboardErrorElement } from "@/page/Dashboard/components/ErrorElement"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import {
  fallbackLoadingStyle,
  fullWidthStyle,
  menuContainerStyle,
} from "./style"

interface AppsContentBodyProps {
  loading: boolean
  onCreatedApp: () => void
}

export const AppsContent: FC<AppsContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { loading, onCreatedApp } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const currentSelectTab = searchParams.get("list") ?? "team"

  const sort =
    (searchParams.get("sort") as PRODUCT_SORT_BY) ?? PRODUCT_SORT_BY.POPULAR

  const { request } = useLoaderData() as { request: Promise<any> }

  return (
    <div css={fullWidthStyle}>
      {isCloudVersion && (
        <div css={menuContainerStyle}>
          <RadioGroup
            onChange={(value) => {
              if (value === "team") {
                searchParams.delete("sort")
                setSearchParams(searchParams)
              }
              searchParams.set("list", value)
              setSearchParams(searchParams)
            }}
            colorScheme={getColor("grayBlue", "02")}
            type="button"
            value={currentSelectTab}
            options={[
              {
                value: "team",
                label: t("dashboard.list-type.team"),
              },
              {
                value: "community",
                label: t("dashboard.list-type.marketplace"),
              },
            ]}
          />
          <div
            style={{
              flexGrow: 1,
            }}
          />
          {currentSelectTab === "community" && (
            <SortSelector
              sort={sort}
              onSortChange={(value) => {
                searchParams.set("sort", value)
                setSearchParams(searchParams)
              }}
            />
          )}
        </div>
      )}
      <Suspense
        fallback={
          <div css={fallbackLoadingStyle}>
            <LoadingIcon spin={true} />
          </div>
        }
      >
        <Await resolve={request} errorElement={<DashboardErrorElement />}>
          {currentSelectTab === "community" && <MarketApps />}
          {currentSelectTab === "team" && (
            <TeamApps loading={loading} navigate={onCreatedApp} />
          )}
        </Await>
      </Suspense>
    </div>
  )
}
