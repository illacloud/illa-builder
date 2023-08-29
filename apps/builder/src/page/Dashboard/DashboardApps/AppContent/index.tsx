import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { RadioGroup, getColor } from "@illa-design/react"
import { MarketApps } from "@/page/Dashboard/DashboardApps/MarketApps"
import { TeamApps } from "@/page/Dashboard/DashboardApps/TeamApps"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { fullWidthStyle, menuContainerStyle } from "./style"

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
      {currentSelectTab === "community" && <MarketApps />}
      {currentSelectTab === "team" && (
        <TeamApps loading={loading} navigate={onCreatedApp} />
      )}
    </div>
  )
}
