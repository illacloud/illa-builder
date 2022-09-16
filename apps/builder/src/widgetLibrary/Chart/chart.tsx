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
} from "chart.js"
import { Chart as ReactChart } from "react-chartjs-2"
import {
  CHART_DATASET_AGGREGATION_METHOD,
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/Chart/interface"
import { formatDataAsObject } from "@/utils/formatData"
import { get, groupBy as groupByFunc, max, mean, min, sum } from "lodash"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { CHART_COLOR_TYPE_CONFIG } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"

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
          display: true,
          title: {
            display: !!xAxisName,
            text: xAxisName,
          },
        },
        y: {
          display: true,
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
  }, [chartTitle, xAxisName, yAxisName])

  return (
    <ReactChart
      type={chartType || "bar"}
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
    return datasets
      .filter(dataset => {
        if (dataset.isHidden == undefined) return true
        return !dataset.isHidden
      })
      .map(dataset => {
        const data: number[] = []
        const {
          datasetValues,
          type,
          datasetName,
          color,
          aggregationMethod,
          isHidden,
        } = dataset
        let finalColor = color
        if (groupBy) {
          finalColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          )
        }

        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.SUM) {
          Object.keys(formatDataSources).forEach(x => {
            let values: number[] = []
            const v = formatDataSources[x]
            v.forEach(vk => {
              values.push(Number(get(vk, datasetValues, 0)))
            })
            data.push(sum(values))
          })
        }
        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.MAX) {
          Object.keys(formatDataSources).forEach(x => {
            let values: number[] = []
            const v = formatDataSources[x]
            v.forEach(vk => {
              values.push(Number(get(vk, datasetValues, 0)))
            })
            data.push(max(values) || 0)
          })
        }
        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.MIN) {
          Object.keys(formatDataSources).forEach(x => {
            let values: number[] = []
            const v = formatDataSources[x]
            v.forEach(vk => {
              values.push(Number(get(vk, datasetValues, 0)))
            })
            data.push(min(values) || 0)
          })
        }

        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.AVERAGE) {
          Object.keys(formatDataSources).forEach(x => {
            let values: number[] = []
            const v = formatDataSources[x]
            v.forEach(vk => {
              values.push(Number(get(vk, datasetValues, 0)))
            })
            data.push(mean(values) || 0)
          })
        }

        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.MEDIAN) {
          Object.keys(formatDataSources).forEach(x => {
            let values: number[] = []
            const v = formatDataSources[x]
            v.forEach(vk => {
              values.push(Number(get(vk, datasetValues, 0)))
            })
            const len = values.length
            let position
            if (len % 2) {
              position = (len + 1) / 2
            } else {
              position = (len || 0) / 2
            }
            data.push(values[position] || 0)
          })
        }

        if (aggregationMethod === CHART_DATASET_AGGREGATION_METHOD.COUNT) {
          Object.keys(formatDataSources).forEach(x => {
            const v = formatDataSources[x]
            data.push(v?.length || 0)
          })
        }

        return {
          label: datasetName,
          data: data,
          type,
          borderColor: finalColor,
          backgroundColor: finalColor,
          hidden: isHidden,
        }
      })
  }, [datasets, formatDataSources, groupBy])

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
