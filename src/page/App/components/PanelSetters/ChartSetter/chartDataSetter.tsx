import { FC, useEffect } from "react"
import { DynamicSelectSetterProps } from "../SelectSetter/interface"

import { DynamicSelectSetter } from "../SelectSetter/dynamicSelect"
import { getDefaultColorScheme, initData } from "@/widgetLibrary/Chart/utils"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import {
  DatasetConfig,
  defaultChartData,
  defaultChartData02,
} from "@/widgetLibrary/Chart/interface"
import { DatasetsSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter"
import { CHART_DATASET_CONFIG } from "@/widgetLibrary/Chart/panelConfig"
import { chartDynamicSelectStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { Select } from "@illa-design/select"

const DATA_SOURCE = "dataSource"

export const ChartDataSetter: FC<DynamicSelectSetterProps> = (props) => {
  const { handleUpdateDsl, panelConfig, widgetDisplayName } = props

  useEffect(() => {
    handleUpdateDsl(DATA_SOURCE, {
      value01: defaultChartData,
      value02: defaultChartData02,
    })
    handleUpdateDsl("dataSourceOptions", [
      {
        label: "value01",
        value: "value01",
      },
      {
        label: "value02",
        value: "value02",
      },
    ])
  }, [])

  return (
    <div>
      <DynamicSelectSetter
        widgetType={""}
        expectedType={VALIDATION_TYPES.STRING}
        widgetDisplayName={widgetDisplayName}
        isSetterSingleRow
        labelName={"Data source"}
        attrName={"dataSource"}
        panelConfig={panelConfig}
        handleUpdateDsl={(attrName, value) => {
          handleUpdateDsl(attrName, value)
          const _data =
            panelConfig?.[DATA_SOURCE]?.[value] &&
            initData(panelConfig?.[DATA_SOURCE]?.[value], panelConfig?.type)
          handleUpdateDsl("data", panelConfig?.[DATA_SOURCE]?.[value])
          handleUpdateDsl("xAxisValuesOptions", _data?.xAxis)
          handleUpdateDsl("groupByOptions", _data?.groupBy)
          handleUpdateDsl("groupBy", undefined)
          handleUpdateDsl("datasets", _data?.datasets)
          handleUpdateDsl("xAxisValues", _data?.xAxis?.[0])
        }}
      />
      <div css={chartDynamicSelectStyle}>
        <PanelLabel labelName={"Chart type"} />
        <Select
          options={[
            {
              label: "Line chart",
              value: "line",
            },
            {
              label: "Bar chart",
              value: "bar",
            },
            {
              label: "Pie chart",
              value: "pie",
            },
            {
              label: "ScatterPlot",
              value: "scatter",
            },
          ]}
          size="small"
          value={panelConfig?.["type"]}
          onChange={(value) => {
            handleUpdateDsl("type", value)
          }}
        />
      </div>
      <div css={chartDynamicSelectStyle}>
        <PanelLabel labelName={"x Axis Values"} />
        <Select
          allowClear
          options={panelConfig?.["xAxisValuesOptions"]}
          size="small"
          value={panelConfig?.["xAxisValues"]}
          onChange={(value) => {
            handleUpdateDsl("xAxisValues", value)
          }}
        />
      </div>
      {panelConfig?.["type"] !== "pie" && (
        <div css={chartDynamicSelectStyle}>
          <PanelLabel labelName={"Group By"} />
          <Select
            allowClear
            options={panelConfig?.["groupByOptions"]}
            size="small"
            value={panelConfig?.["groupBy"]}
            onChange={(value) => {
              handleUpdateDsl("groupBy", value)
              const data = panelConfig?.["data"]
              const groups = Array.from(
                new Set(data?.map((item: any) => item[value])),
              )
              const _lineColor = groups.map((item: any, index: number) =>
                getDefaultColorScheme(index),
              )
              const _datasets = panelConfig?.["datasets"].map(
                (item: DatasetConfig) => ({ ...item, lineColor: _lineColor }),
              )
              handleUpdateDsl("datasets", _datasets)
            }}
          />
        </div>
      )}
      <DatasetsSetter
        widgetType={""}
        expectedType={VALIDATION_TYPES.STRING}
        widgetDisplayName={widgetDisplayName}
        handleUpdateDsl={handleUpdateDsl}
        attrName={"datasets"}
        value={panelConfig?.["datasets"]}
        childrenSetter={CHART_DATASET_CONFIG}
      />
    </div>
  )
}

ChartDataSetter.displayName = "ChartDataSetter"
