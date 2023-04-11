import { get } from "lodash"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import {
  CHART_COLOR_TYPE_CONFIG,
  CHART_COLOR_TYPE_CONFIG_KEYS,
  ColorArea,
} from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { chartColorLabelStyle } from "@/page/App/components/PanelSetters/ChartSetter/style"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ChartColorSelectSetterProps } from "./interface"

interface CHartColorLabelProps {
  color: string
}

export const ChartColorLabel: FC<CHartColorLabelProps> = (props) => {
  const { color } = props
  return (
    <div css={chartColorLabelStyle}>
      <ColorArea color={color} />
      {color}
    </div>
  )
}

export const ChartColorSelectSetter: FC<ChartColorSelectSetterProps> = (
  props,
) => {
  const {
    isSetterSingleRow,
    attrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const chartType = useMemo(() => {
    return get(targetComponentProps, "chartType", "bar")
  }, [targetComponentProps])

  const isCanGroupBy = useMemo(() => {
    return !!get(targetComponentProps, "groupBy", "")
  }, [targetComponentProps])

  const options = useMemo(() => {
    if (isCanGroupBy || chartType === "pie") {
      return CHART_COLOR_TYPE_CONFIG_KEYS.map((key) => {
        return {
          label: <ChartColorLabel color={key} />,
          value: key,
        }
      })
    }
    return CHART_COLOR_TYPE_CONFIG["illa-preset"].map((key) => {
      return {
        label: <ChartColorLabel color={key} />,
        value: key,
      }
    })
  }, [chartType, isCanGroupBy])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="medium"
        value={value}
        colorScheme="techPurple"
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}

ChartColorSelectSetter.displayName = "BaseSelect"
