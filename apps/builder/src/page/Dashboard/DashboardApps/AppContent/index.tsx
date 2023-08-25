import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  RadioGroup,
  getColor,
} from "@illa-design/react"
import { AppCard } from "@/page/Dashboard/DashboardApps/AppCard"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import {
  cardContainerStyle,
  emptyStyle,
  emptyTextStyle,
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

  const appList: DashboardApp[] = useSelector(getDashboardApps)

  const [currentSelectTab, setCurrentSelectTab] = useState<"market" | "team">(
    "team",
  )

  const [currentSort, setCurrentSort] = useState<MARKET_AGENT_SORTED_OPTIONS>(
    MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  )

  return (
    <div css={fullWidthStyle}>
      {isCloudVersion && (
        <div css={menuContainerStyle}>
          <RadioGroup
            onChange={(value) => {
              setCurrentSelectTab(value)
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
                value: "market",
                label: t("dashboard.list-type.marketplace"),
              },
            ]}
          />
          <div
            style={{
              flexGrow: 1,
            }}
          />
          {currentSelectTab === "market" && (
            <SortSelector
              sort={currentSort}
              onSortChange={(value) => {
                setCurrentSort(value)
              }}
            />
          )}
        </div>
      )}
      {currentSelectTab === "team" && appList.length !== 0 && (
        <div css={cardContainerStyle}>
          {appList?.map((item) => (
            <AppCard key={item.appId} data-element="listItem" appInfo={item} />
          ))}
        </div>
      )}
      {currentSelectTab === "team" && appList.length === 0 && (
        <Empty
          paddingVertical="120px"
          icon={<EmptyIcon size="48px" color={getColor("grayBlue", "02")} />}
          description={
            <div css={emptyStyle}>
              <div css={emptyTextStyle}>{t("new_dashboard.desc.blank")}</div>
              <Button
                colorScheme="grayBlue"
                loading={loading}
                variant="outline"
                leftIcon={<PlusIcon size="10px" />}
                onClick={onCreatedApp}
              >
                {t("new_dashboard.button.blank")}
              </Button>
            </div>
          }
        />
      )}
    </div>
  )
}
