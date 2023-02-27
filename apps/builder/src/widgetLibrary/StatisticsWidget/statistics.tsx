import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { Statistic, Trigger } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { AllData } from "@/widgetLibrary/IconWidget/utils"
import { useAutoUpdateHeight } from "@/widgetLibrary/PublicSector/utils/autoUpdateHeight"
import {
  StatisticWidgetProps,
  WrappedStatisticProps,
} from "@/widgetLibrary/StatisticsWidget/interface"
import {
  contentContainerStyle,
  getPrefixIconStyle,
  getSecondaryStatisticContainerStyle,
  getSecondaryStatisticStyle,
  getStatisticContainerStyle,
  getStatisticStyle,
  statisticContainerStyle,
  statisticTitleStyle,
} from "@/widgetLibrary/StatisticsWidget/style"
import { Text } from "@/widgetLibrary/TextWidget"

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
  const icon = (value ?? 0.0) >= 0 ? positiveSignIcon : negativeSignIcon

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
        {secondaryValue && (
          <div css={getSecondaryStatisticContainerStyle(secondaryColor)}>
            {secondaryIcon}
            <Statistic
              _css={getSecondaryStatisticStyle(secondaryColor)}
              groupSeparator={secondaryGroupSeparator}
              value={secondaryValue}
              precision={secondaryDecimalPlace}
              prefix={secondaryPrefixText}
              suffix={secondarySuffixText}
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
    <div css={getStatisticContainerStyle(textAlign)} onClick={handleOnClick}>
      {icon}
      <div css={contentContainerStyle}>
        <div css={statisticTitleStyle}>{label}</div>
        <div css={statisticContainerStyle}>
          <Statistic
            _css={getStatisticStyle(color)}
            value={primaryValue}
            precision={decimalPlace}
            prefix={prefixText}
            suffix={suffixText}
            groupSeparator={groupSeparator}
          />
          {suffixNode}
        </div>
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
    displayName,
    tooltipText,
    secondaryValue,
    prefixText,
    suffixText,
    secondaryPrefixText,
    secondarySuffixText,
    updateComponentHeight,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const heightRef = useRef<number>(0)
  const previousValueRef = useRef<number | undefined>(primaryValue)

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      setPrimaryValue: (value: number) => {
        if (primaryValue === value) return
        handleUpdateDsl({ primaryValue: value })
      },
      resetPrimaryValue: () => {
        if (previousValueRef.current === primaryValue) return
        handleUpdateDsl({
          primaryValue: previousValueRef.current,
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleDeleteGlobalData,
    handleUpdateDsl,
    handleUpdateGlobalData,
    primaryValue,
  ])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  const [containerRef] = useAutoUpdateHeight(updateComponentHeight, true)
  if (
    heightRef.current === 0 &&
    (containerRef.current?.clientHeight || 0) > 0
  ) {
    heightRef.current = containerRef.current?.clientHeight || 0
  }

  const StatisticValueContent = useMemo(() => {
    return (
      <>
        {primaryValue !== undefined ? (
          <Text
            value={`${prefixText ? `${prefixText} ` : ""}${primaryValue}${
              suffixText ? ` ${suffixText}` : ""
            }`}
            colorScheme="white"
          />
        ) : null}
        {secondaryValue && (
          <>
            {secondaryValue !== undefined ? (
              <Text
                value={`${
                  secondaryPrefixText ? `${secondaryPrefixText} ` : ""
                }${secondaryValue}${
                  secondarySuffixText ? ` ${secondarySuffixText}` : ""
                }`}
                colorScheme="white"
              />
            ) : null}
          </>
        )}
      </>
    )
  }, [
    prefixText,
    primaryValue,
    secondaryPrefixText,
    secondarySuffixText,
    secondaryValue,
    suffixText,
  ])

  const ShowTooltipText = useMemo(() => {
    const BasicCom = tooltipText ? (
      <Text value={tooltipText} colorScheme="white" />
    ) : null

    if (containerRef.current) {
      let result
      if (heightRef.current >= containerRef.current?.clientHeight) {
        result = BasicCom
      } else {
        result = StatisticValueContent
      }
      heightRef.current = containerRef.current?.clientHeight
      return result
    }
    return BasicCom
  }, [StatisticValueContent, containerRef, tooltipText])

  return (
    <div ref={containerRef}>
      <Trigger
        content={<>{ShowTooltipText}</>}
        colorScheme="grayBlue"
        disabled={!ShowTooltipText}
        position="top-start"
        showArrow={false}
        autoFitPosition={false}
        trigger="hover"
      >
        <div>
          <WrappedStatistic {...props} handleOnClick={handleOnClick} />
        </div>
      </Trigger>
    </div>
  )
}
StatisticWidget.displayName = "StatisticWidget"
