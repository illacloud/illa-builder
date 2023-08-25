import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"
import * as React from "react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DownIcon, DropList, DropListItem, Dropdown } from "@illa-design/react"
import { SortSelectorProps } from "@/page/Dashboard/components/SortSelector/interface"
import {
  sortContainerStyle,
  sortTextStyle,
} from "@/page/Dashboard/components/SortSelector/style"

export const SortSelector: FC<SortSelectorProps> = (props) => {
  const { sort, onSortChange } = props

  const { t } = useTranslation()

  const sortOptions = [
    {
      value: MARKET_AGENT_SORTED_OPTIONS.POPULAR,
      label: t("dashboard.sort-type.popular"),
    },
    {
      value: MARKET_AGENT_SORTED_OPTIONS.LATEST,
      label: t("dashboard.sort-type.recent"),
    },
    {
      value: MARKET_AGENT_SORTED_OPTIONS.STARRED,
      label: t("dashboard.sort-type.star"),
    },
  ]

  return (
    <Dropdown
      position="bottom-end"
      dropList={
        <DropList
          onClickItem={(key) => {
            onSortChange?.(key as MARKET_AGENT_SORTED_OPTIONS)
          }}
        >
          {sortOptions.map((option) => (
            <DropListItem
              value={option.value}
              title={option.label}
              key={option.value}
            />
          ))}
        </DropList>
      }
    >
      <div css={sortContainerStyle}>
        <span css={sortTextStyle}>
          {sortOptions.find((item) => item.value === sort)?.label}
        </span>
        <DownIcon ml="8px" />
      </div>
    </Dropdown>
  )
}
