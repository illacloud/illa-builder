import { FC, useMemo } from "react"
import {
  Chart as ChartJS,
  LineElement,
  LineController,
  PointElement,
  BarElement,
  BarController,
  PieController,
  ArcElement,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartDataset,
  ChartData,
} from "chart.js"
import { Chart as ReactChart, Pie } from "react-chartjs-2"
import {
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/Chart/interface"
import { formatDataAsObject } from "@/utils/formatData"
import { get, groupBy as groupByFunc } from "lodash"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { CHART_COLOR_TYPE_CONFIG } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { formatData, rotateGroupByData } from "@/widgetLibrary/Chart/utils"

ChartJS.register(
  /** Bar chart**/
  BarElement,
  BarController,
  /** Line chart**/
  LineElement,
  LineController,
  PointElement,
  /** Pie chart**/
  PieController,
  ArcElement,
  /** Scatter chart**/
  ScatterController,
  /**Other**/
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
)

export const Chart: FC<ChartWidgetProps> = props => {
  const { datasets, xAxis, chartType, chartTitle, xAxisName, yAxisName } = props

  const data = useMemo(() => {
    return {
      labels: xAxis,
      datasets,
    }
  }, [datasets, xAxis])

  const options: ChartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: chartType !== "pie",
          title: {
            display: !!xAxisName,
            text: xAxisName,
          },
        },
        y: {
          display: chartType !== "pie",
          title: {
            display: !!yAxisName,
            text: yAxisName,
          },
        },
      },
      plugins: {
        title: {
          display: !!chartTitle,
          text: chartTitle,
          color: globalColor(`--${illaPrefix}-grayBlue-02`),
          font: {
            size: 16,
          },
        },
      },
    }
  }, [chartTitle, chartType, xAxisName, yAxisName])

  const finalType = useMemo(() => {
    if (chartType === "scatter") {
      return "line"
    }
    return chartType
  }, [chartType])

  if (finalType === "pie") {
    return (
      <Pie
        datasetIdKey="id"
        data={data as ChartData<"pie", number | null[], string>}
        options={options as ChartOptions<"pie">}
      />
    )
  }

  return (
    <ReactChart
      type={finalType}
      datasetIdKey="id"
      data={data}
      options={options}
    />
  )
}

export const ChartWidget: FC<WrappedChartProps> = props => {
  const {
    w,
    h,
    unitW,
    unitH,
    dataSource,
    dataSourceJS,
    dataSourceMode,
    chartType,
    xAxis,
    groupBy,
    chartTitle,
    xAxisName,
    yAxisName,
    datasets,
  } = props

  const realDataSourceArray = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? dataSourceJS : []
    }
    return dataSource ? dataSource : []
  }, [dataSource, dataSourceJS, dataSourceMode])

  const realDataSourceObject = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? formatDataAsObject(dataSourceJS) : {}
    }
    return dataSource ? formatDataAsObject(dataSource) : {}
  }, [dataSource, dataSourceJS, dataSourceMode])

  const realXAxis = useMemo(() => {
    const xAxisArray = get(realDataSourceObject, xAxis, [])
    if (Array.isArray(xAxisArray)) {
      return Array.from(new Set(xAxisArray)) as string[]
    }
    return []
  }, [realDataSourceObject, xAxis])

  const formatDataSources = useMemo(() => {
    return groupByFunc(realDataSourceArray, xAxis)
  }, [realDataSourceArray, xAxis])

  const realDatasets: ChartDataset[] = useMemo(() => {
    if (!Array.isArray(datasets)) return []
    const result = datasets
      .filter(dataset => {
        if (dataset.isHidden == undefined) return true
        return !dataset.isHidden
      })
      .map(dataset => {
        const {
          datasetValues,
          type,
          datasetName,
          color,
          aggregationMethod,
        } = dataset
        let finalColor = color
        if (groupBy || chartType === "pie") {
          finalColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          )
        }
        let data: number[] = []
        if (!groupBy || chartType === "pie") {
          data = formatData(formatDataSources, datasetValues, aggregationMethod)
        } else {
          let keys: string[] = []
          const r1 = Object.keys(formatDataSources).map(key => {
            const value = formatDataSources[key]
            const groupData = groupByFunc(value, groupBy)
            keys.push(...Object.keys(groupData))
            return formatData(groupData, datasetValues, aggregationMethod)
          })
          const rotate = rotateGroupByData(r1)
          let point = 0
          const groupByColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          ) as string[]
          return rotate.map((d, i) => {
            return {
              label: `${datasetName}(${keys[point++]})`,
              data: d,
              type,
              borderColor: groupByColor[i % groupByColor.length],
              backgroundColor: groupByColor[i % groupByColor.length],
            }
          })
        }

        data = formatData(formatDataSources, datasetValues, aggregationMethod)
        return {
          label: datasetName,
          data: data,
          type,
          borderColor: finalColor,
          backgroundColor: finalColor,
        }
      })
      .flat()
    if (chartType === "pie") {
      return result.length > 0 ? [result[result.length - 1]] : []
    } else {
      return result
    }
  }, [chartType, datasets, formatDataSources, groupBy])

  return (
    <Chart
      w={w}
      h={h}
      unitH={unitH}
      unitW={unitW}
      xAxis={realXAxis}
      datasets={realDatasets}
      chartType={chartType}
      chartTitle={chartTitle}
      xAxisName={xAxisName}
      yAxisName={yAxisName}
    />
  )
}

ChartWidget.displayName = "ChartWidget"
