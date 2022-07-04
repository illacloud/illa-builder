import { RateProps } from "@illa-design/rate"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedRateProps
  extends Omit<ValidateMessageProps, "value">,
    Pick<RateProps, "allowHalf" | "allowClear" | "disabled"> {
  value?: number
  loading?: boolean
  readOnly?: boolean
  icon?: "star" | "heart"
  maxCount?: RateProps["count"]
  handleUpdateDsl: (value: Record<string, number>) => void
}
