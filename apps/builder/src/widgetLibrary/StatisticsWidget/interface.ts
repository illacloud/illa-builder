import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedStatisticProps extends BaseWidgetProps {
  prefixText?: string
  suffixText?: string
  primaryValue?: number
  secondaryValue?: number
  decimalPlace?: number
  showTrendSign?: boolean
  positiveSign?: string
  negativeSign?: string
  showSeparator?: boolean
  enableTrendColor?: boolean
  secondaryPrefixText?: string
  secondarySuffixText?: string
  secondaryDecimalPlace?: number
  secondaryShowTrendSign?: boolean
  secondaryPositiveSign?: string
  secondaryNegativeSign?: string
  secondaryShowSeparator?: boolean
  secondaryEnableTrendColor?: boolean
  textAlign?: "start" | "center" | "end"
  colorScheme?: string
  negativeColorScheme?: string
  label?: string
  positiveColorScheme?: string
  handleOnClick?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  getValidateMessage: (value: string) => string
}

export interface StatisticWidgetProps
  extends WrappedStatisticProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  label?: string
}
