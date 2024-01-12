import { get } from "lodash-es"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  CHART_COLOR_TYPE_CONFIG_KEYS,
  CHART__BASE_COLOR_TYPE_CONFIG,
  ColorArea,
} from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { chartColorLabelStyle } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import BaseSelectSetter from "../SelectSetter/baseSelect"
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

const ChartColorSelectSetter: FC<ChartColorSelectSetterProps> = (props) => {
  const { widgetDisplayName } = props

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
    return CHART__BASE_COLOR_TYPE_CONFIG.map((key) => {
      return {
        label: <ChartColorLabel color={key} />,
        value: key,
      }
    })
  }, [chartType, isCanGroupBy])

  return <BaseSelectSetter {...props} options={options} />
}

ChartColorSelectSetter.displayName = "BaseSelect"
export default ChartColorSelectSetter
