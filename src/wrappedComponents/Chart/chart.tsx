import { DATAType, testData, testJson, WrappedChartProps } from "./interface"
import { FC, useEffect, useMemo, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
  TimeScale,
  ArcElement,
  LogarithmicScale,
} from "chart.js"
import { Line, Bar, Pie, Scatter } from "react-chartjs-2"
import {
  initData,
  wrapDataset,
  wrapDatasetByGroup,
  wrapPieDataset,
} from "./utils"
import { Wrapper } from "../Wrapper"
import "chartjs-adapter-moment"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { formatPropsToChartOptions } from "./formatData"
import { withParser } from "@/wrappedComponents/parserHOC"
import { withData } from "@/wrappedComponents/Chart/dataManager"

export const DATA: DATAType = {}
ChartJS.register(ArcElement, Tooltip, Legend, Title)
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LogarithmicScale,
  ChartDataLabels,
)
export const WrappedChart: FC<WrappedChartProps> = (props) => {
  const {
    data = testData,
    legendPosition = "bottom",
    title = "Chart",
    xTitle = "x-title",
    yTitle = "y-title",
    groupBy,
    datasets,
    type = "Line",
    xType = "category",
    xAxisValues,
    initConfigByData,
    chartJson,
  } = props

  const dataMap = useRef<{ [key: string]: any }>()

  const [_dataSets, _tooltips] = useMemo(() => {
    if (!datasets) return [[]]
    let res
    if (type === "Pie") {
      res = wrapPieDataset(datasets)
    } else if (groupBy && groupBy?.length > 0 && datasets) {
      const _groups = dataMap.current ? dataMap.current[groupBy] : []
      res = wrapDatasetByGroup(data, datasets, _groups, groupBy)
    } else {
      res = wrapDataset(datasets)
    }
    console.log(res)
    return [res.datasets, res.tooltips]
  }, [datasets, groupBy])

  useEffect(() => {
    const res = initData(data)
    initConfigByData &&
      initConfigByData(res.xAxis, res.groupBy, res.datasets, res.dataMap)
    dataMap.current = res.dataMap
  }, [])

  const _Chart = useMemo(() => {
    switch (type) {
      case "Line":
        return Line
      case "Bar":
        return Bar
      case "Pie":
        return Pie
      case "ScatterPlot":
        return Scatter
      default:
        return Line
    }
  }, [type])

  const _options: ChartJS.ChartOptions = useMemo(() => {
    return formatPropsToChartOptions(
      type,
      title,
      xType,
      xTitle,
      yTitle,
      legendPosition,
      _tooltips,
    )
  }, [type, title, xType, xTitle, yTitle, legendPosition, _tooltips])

  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let myChart: ChartJS
    const ctx = ref?.current?.getContext("2d")
    if (chartJson && ctx) {
      myChart = new ChartJS(ctx, JSON.parse(chartJson))
    }
    return () => {
      myChart?.destroy()
    }
  }, [])

  return (
    <Wrapper w={"400px"}>
      {chartJson ? (
        <canvas ref={ref} id={"mychartjs"} width="400" height="400" />
      ) : (
        <_Chart
          data={{
            labels: xAxisValues,
            datasets: _dataSets,
          }}
          options={_options}
        />
      )}
    </Wrapper>
  )
}

export const ChartWidget = withData()
WrappedChart.displayName = "ChartWidget"
