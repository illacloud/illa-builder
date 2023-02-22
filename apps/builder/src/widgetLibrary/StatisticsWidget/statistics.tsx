import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { Statistic } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  StatisticWidgetProps,
  WrappedStatisticProps,
} from "@/widgetLibrary/StatisticsWidget/interface"

const getNumberGroupSeparator = (value: number | undefined, lang: string) => {
  if (value === undefined) {
    return value
  }
  const numberFormat = new Intl.NumberFormat(lang, {
    style: "decimal",
  })
  const parts = numberFormat
    .formatToParts(value)
    .filter((part) => part.type === "group")
  return parts[0]?.value
}

export const WrappedStatistic: FC<WrappedStatisticProps> = (props) => {
  const builderInfo = useSelector(getBuilderInfo)

  const {
    primaryValue,
    secondaryValue,
    decimalPlace,
    prefixText,
    suffixText,
    secondaryPrefixText,
    secondarySuffixText,
    showTrendSign,
    positiveSign,
    negativeSign,
    showSeparator,
    enableTrendColor,
    secondaryDecimalPlace,
    secondaryShowTrendSign,
    secondaryPositiveSign,
    secondaryNegativeSign,
    secondaryShowSeparator,
    secondaryEnableTrendColor,
    textAlign,
    colorScheme,
    negativeColorScheme,
    positiveColorScheme,
    handleOnClick,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const groupSeparator = getNumberGroupSeparator(
    primaryValue ?? 0.0,
    builderInfo.language,
  )
  const secondarySeparator = getNumberGroupSeparator(
    secondaryValue,
    builderInfo.language,
  )

  return (
    <>
      <Statistic
        value={primaryValue ?? 0.0}
        precision={decimalPlace}
        prefix={prefixText}
        suffix={suffixText}
        groupSeparator={groupSeparator}
      />
      {secondaryValue && (
        <Statistic
          groupSeparator={secondarySeparator}
          value={secondaryValue}
          precision={secondaryDecimalPlace}
          prefix={secondaryPrefixText}
          suffix={secondarySuffixText}
        />
      )}
    </>
  )
}
WrappedStatistic.displayName = "WrappedStatistic"

export const StatisticWidget: FC<StatisticWidgetProps> = (props) => {
  const {
    label,
    primaryValue,
    secondaryValue,
    decimalPlace,
    showTrendSign,
    positiveSign,
    negativeSign,
    showSeparator,
    enableTrendColor,
    secondaryPrefixText,
    secondarySuffixText,
    secondaryDecimalPlace,
    secondaryShowTrendSign,
    secondaryPositiveSign,
    secondaryNegativeSign,
    secondaryShowSeparator,
    secondaryEnableTrendColor,
    handleOnClick,
    prefixText,
    suffixText,
    handleUpdateDsl,
    displayName,
    tooltipText,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      primaryValue,
      secondaryValue,
      decimalPlace,
      showTrendSign,
      positiveSign,
      negativeSign,
      showSeparator,
      enableTrendColor,
      secondaryPrefixText,
      secondarySuffixText,
      secondaryDecimalPlace,
      secondaryShowTrendSign,
      secondaryPositiveSign,
      secondaryNegativeSign,
      secondaryShowSeparator,
      secondaryEnableTrendColor,
      prefixText,
      suffixText,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    decimalPlace,
    displayName,
    enableTrendColor,
    handleDeleteGlobalData,
    handleOnClick,
    handleUpdateDsl,
    handleUpdateGlobalData,
    negativeSign,
    positiveSign,
    prefixText,
    primaryValue,
    secondaryDecimalPlace,
    secondaryEnableTrendColor,
    secondaryNegativeSign,
    secondaryPositiveSign,
    secondaryPrefixText,
    secondaryShowSeparator,
    secondaryShowTrendSign,
    secondarySuffixText,
    secondaryValue,
    showSeparator,
    showTrendSign,
    suffixText,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div>
        <Label
          label={label}
          labelFull={true}
          labelHidden={false}
          labelWidth={100}
          hasTooltip={!!tooltipText}
        />
        <WrappedStatistic {...props} />
      </div>
    </TooltipWrapper>
  )
}
StatisticWidget.displayName = "StatisticWidget"
