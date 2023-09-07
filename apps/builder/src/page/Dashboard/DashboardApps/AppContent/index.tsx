import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { RadioGroup, getColor } from "@illa-design/react"
import { MarketApps } from "@/page/Dashboard/DashboardApps/MarketApps"
import { TeamApps } from "@/page/Dashboard/DashboardApps/TeamApps"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { track } from "@/utils/mixpanelHelper"
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

  const handleRadioChange = (value: string) => {
    if (value === "team") {
      searchParams.delete("sort")
      setSearchParams(searchParams)
    }
    searchParams.set("list", value)
    setSearchParams(searchParams)
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "type_radio",
      parameter3: value,
    })
  }

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value)
    setSearchParams(searchParams)
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CHANGE,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      {
        element: "filter_select",
        parameter1: value,
      },
    )
  }

  return (
    <div css={fullWidthStyle}>
      {isCloudVersion && (
        <div css={menuContainerStyle}>
          <RadioGroup
            onChange={handleRadioChange}
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
            <SortSelector sort={sort} onSortChange={handleSortChange} />
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
