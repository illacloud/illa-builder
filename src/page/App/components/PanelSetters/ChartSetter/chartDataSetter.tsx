import { FC, useEffect, useRef, useState } from "react"
import { DynamicSelectSetterProps } from "../SelectSetter/interface"

import { BaseSelect } from "../SelectSetter/baseSelect"
import { DynamicSelectSetter } from "../SelectSetter/dynamicSelect"
import { initData } from "@/widgetLibrary/Chart/utils"
import { applySetterWrapperStyle } from "@/page/App/components/InspectPanel/style"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import {
  defaultChartData,
  defaultChartData02,
} from "@/widgetLibrary/Chart/interface"
import { DatasetsSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter"
import { CHART_DATASET_CONFIG } from "@/widgetLibrary/Chart/panelConfig"
import {
  applyBaseSelectWrapperStyle,
  chartDynamicSelectStyle,
  dynamicSelectHeaderStyle,
  dynamicSelectStyle,
} from "@/page/App/components/PanelSetters/SelectSetter/style"
import { Select } from "@illa-design/select"

const DATA_SOURCE = "dataSource"

export const ChartDataSetter: FC<DynamicSelectSetterProps> = (props) => {
  const { options, attrName, handleUpdateDsl, panelConfig, widgetDisplayName } =
    props

  // init dataSource  todo@aoao
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
            initData(panelConfig?.[DATA_SOURCE]?.[value])
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
              value: "scatterPlot",
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
      <div css={chartDynamicSelectStyle}>
        <PanelLabel labelName={"Group By"} />
        <Select
          allowClear
          options={panelConfig?.["groupByOptions"]}
          size="small"
          value={panelConfig?.["groupBy"]}
          onChange={(value) => {
            handleUpdateDsl("groupBy", value)
          }}
        />
      </div>
      <DatasetsSetter
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
