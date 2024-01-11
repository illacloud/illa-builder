import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { Statistic } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { AllData } from "@/widgetLibrary/IconWidget/utils"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  StatisticWidgetProps,
  WrappedStatisticProps,
} from "@/widgetLibrary/StatisticsWidget/interface"
import {
  getPrefixIconStyle,
  getSecondaryStatisticContainerStyle,
  getSecondaryStatisticStyle,
  getStatisticLabelStyle,
  getStatisticStyle,
  getStatisticWrapperStyle,
  getStatisticsContainerStyle,
  primaryStatisticContainerStyle,
} from "@/widgetLibrary/StatisticsWidget/style"

const getNumberGroupSeparator = (value: number | undefined, lang: string) => {
  if (value === undefined) {
    return ""
  }
  const numberFormat = new Intl.NumberFormat(lang, {
    style: "decimal",
  })
  const parts = numberFormat
    .formatToParts(value)
    .filter((part) => part.type === "group")
  return parts[0]?.value ?? ""
}

const getIcon = (iconName: string) => (iconName && AllData[iconName]) || null

const getTrendSignAndIcon = (
  show: boolean,
  value?: number,
  positiveSign?: string,
  negativeSign?: string,
  color?: string,
  secondary?: boolean,
) => {
  const positiveSignIcon = getIcon(positiveSign ?? "")
  const negativeSignIcon = getIcon(negativeSign ?? "")
  const icon = (value ?? 0) >= 0 ? positiveSignIcon : negativeSignIcon

  return (
    show &&
    icon && (
      <span css={getPrefixIconStyle(color, secondary)}>{icon && icon({})}</span>
    )
  )
}

export const WrappedStatistic: FC<WrappedStatisticProps> = (props) => {
  const builderInfo = useSelector(getBuilderInfo)
  const {
    label,
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
    handleOnClick,
    colorScheme,
    negativeColorScheme,
    positiveColorScheme,
  } = props

  const groupSeparator = showSeparator
    ? getNumberGroupSeparator(primaryValue, builderInfo.language)
    : ""
  const secondaryGroupSeparator = secondaryShowSeparator
    ? getNumberGroupSeparator(secondaryValue, builderInfo.language)
    : ""

  const getColor = useCallback(
    (value?: number, enableTrendColor?: boolean) => {
      return enableTrendColor
        ? value !== undefined && value >= 0
          ? positiveColorScheme
          : negativeColorScheme
        : colorScheme
    },
    [colorScheme, negativeColorScheme, positiveColorScheme],
  )

  const color = getColor(primaryValue, enableTrendColor)
  const secondaryColor = getColor(secondaryValue, secondaryEnableTrendColor)

  const icon = getTrendSignAndIcon(
    !!showTrendSign,
    primaryValue,
    positiveSign,
    negativeSign,
    color,
  )

  const secondaryIcon = getTrendSignAndIcon(
    !!secondaryShowTrendSign,
    secondaryValue,
    secondaryPositiveSign,
    secondaryNegativeSign,
    secondaryColor,
    true,
  )

  const suffixNode = useMemo(
    () => (
      <>
        {secondaryValue !== undefined && (
          <div css={getSecondaryStatisticContainerStyle(secondaryColor)}>
            {secondaryIcon}
            <Statistic
              _css={getSecondaryStatisticStyle}
              groupSeparator={secondaryGroupSeparator}
              value={secondaryValue}
              precision={secondaryDecimalPlace}
              prefix={secondaryPrefixText}
              suffix={secondarySuffixText}
              colorScheme={secondaryColor}
            />
          </div>
        )}
      </>
    ),
    [
      secondaryColor,
      secondaryDecimalPlace,
      secondaryGroupSeparator,
      secondaryIcon,
      secondaryPrefixText,
      secondarySuffixText,
      secondaryValue,
    ],
  )

  return (
    <div css={getStatisticWrapperStyle(textAlign)} onClick={handleOnClick}>
      <div css={getStatisticLabelStyle(textAlign)}>{label}</div>
      <div css={getStatisticsContainerStyle(textAlign)}>
        <div css={primaryStatisticContainerStyle}>
          {icon}
          <Statistic
            _css={getStatisticStyle}
            value={primaryValue}
            precision={decimalPlace}
            prefix={prefixText}
            suffix={suffixText}
            colorScheme={color}
            groupSeparator={groupSeparator}
          />
        </div>
        {suffixNode}
      </div>
    </div>
  )
}
WrappedStatistic.displayName = "WrappedStatistic"

export const StatisticWidget: FC<StatisticWidgetProps> = (props) => {
  const {
    primaryValue,
    triggerEventHandler,
    handleUpdateDsl,
    tooltipText,
    updateComponentHeight,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  const previousValueRef = useRef<number | undefined>(primaryValue)
  const signalRef = useRef<boolean>(false)

  useEffect(() => {
    if (signalRef.current) {
      signalRef.current = false
      return
    }
    previousValueRef.current = primaryValue
  }, [primaryValue])

  useEffect(() => {
    updateComponentRuntimeProps({
      setPrimaryValue: (value: number) => {
        signalRef.current = true
        handleUpdateDsl({ primaryValue: value })
      },
      resetPrimaryValue: () => {
        handleUpdateDsl({
          primaryValue: previousValueRef.current,
        })
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleUpdateDsl,
    updateComponentRuntimeProps,
  ])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={true}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div>
          <WrappedStatistic {...props} handleOnClick={handleOnClick} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}
StatisticWidget.displayName = "StatisticWidget"
export default StatisticWidget
