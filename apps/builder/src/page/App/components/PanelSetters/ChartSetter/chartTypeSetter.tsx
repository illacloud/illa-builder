import { FC } from "react"
import { ChartTypeSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { Select } from "@illa-design/select"
import {
  BarChartIcon,
  LineChartIcon,
  ScatterPlotIcon,
  PieChartIcon,
} from "@illa-design/icon"
import {
  chartTypeIconCss,
  chartTypeStringCss,
} from "@/page/App/components/PanelSetters/ChartSetter/style"
import i18n from "@/i18n/config"
const typeOptions = [
  {
    label: (
      <span>
        <BarChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.bar")}
        </span>
      </span>
    ),
    value: "bar",
  },
  {
    label: (
      <div>
        <LineChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.line")}
        </span>
      </div>
    ),
    value: "line",
  },
  {
    label: (
      <div>
        <ScatterPlotIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.scatterplot")}
        </span>
      </div>
    ),
    value: "scatterplot",
  },
  {
    label: (
      <div>
        <PieChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.pie")}
        </span>
      </div>
    ),
    value: "pie",
  },
]

export const ChartTypeSetter: FC<ChartTypeSetterProps> = props => {
  const { value } = props
  return <Select options={typeOptions} colorScheme="techPurple" />
}

ChartTypeSetter.displayName = "ChartTypeSetter"
