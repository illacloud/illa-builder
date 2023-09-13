import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent"
import { PRODUCT_SORT_BY } from "@illa-public/market-app/service/interface"

export interface SortSelectorProps {
  onSortChange: (sort: MARKET_AGENT_SORTED_OPTIONS | PRODUCT_SORT_BY) => void
  sort: MARKET_AGENT_SORTED_OPTIONS | PRODUCT_SORT_BY
}
