import { FC, useContext, useEffect, useRef, useState } from "react"
import { DynamicSwitchProps } from "./interface"
import {
  dynamicSelectHeaderStyle,
  dynamicSelectStyle,
  useTypeTextStyle,
} from "@/page/Editor/components/PanelSetters/SelectSetter/style"
import { Input } from "@illa-design/input"
import { Select } from "@illa-design/select"
import { initData } from "@/wrappedComponents/Chart/utils"
import {
  defaultChartData,
  defaultChartData02,
} from "@/wrappedComponents/Chart/interface"
import { BaseSelect } from "@/page/Editor/components/PanelSetters/SelectSetter/baseSelect"
import { DynamicSelectSetter } from "@/page/Editor/components/PanelSetters/SelectSetter/dynamicSelect"
import { applySetterWrapperStyle } from "@/page/Editor/components/InspectPanel/style"
import { PanelLabel } from "@/page/Editor/components/InspectPanel/label"
import { DatasetsSetter } from "@/page/Editor/components/PanelSetters/DatasetsSetter"

export const ChartDataSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    options,
    attrName,
    handleUpdateDsl,
    handleUpdatePanelConfig,
    panelConfig,
    defaultValue,
    labelName,
    useCustomLabel,
  } = props

  // todo@aoao  mock DataSource
  const DataSource: { [key: string]: any } = {
    value01: defaultChartData,
    value02: defaultChartData02,
    options: [
      {
        label: "value01",
        value: "value01",
      },
      {
        label: "value02",
        value: "value02",
      },
    ],
  }

  const dataRef = useRef<{ [key: string]: any }>()

  return (
    <div>
      <DynamicSelectSetter
        isFullWidth
        useCustomLabel
        labelName={"Data source"}
        attrName={"dataSource"}
        defaultValue={defaultValue}
        options={options}
        panelConfig={panelConfig}
        handleUpdatePanelConfig={handleUpdatePanelConfig}
        handleUpdateDsl={(value) => {
          const dataRes = DataSource[value["dataSource"]]
          const res = initData(dataRes)
          dataRef.current = res.dataMap
          handleUpdateDsl({
            [attrName]: value[attrName],
            ["data"]: dataRes,
            ["datasets"]: res.datasets,
          })
          handleUpdatePanelConfig({
            ["chart-dateMap"]: res.dataMap,
            ["xAxisValues_options"]: res.xAxis,
            ["groupBy_options"]: res.groupBy,
            ["datasets"]: res.datasets,
            // ["datasets-options"]: res.datasets,
          })
        }}
      />
      <div css={applySetterWrapperStyle(true)}>
        <PanelLabel labelName={"Chart type"} />
        <BaseSelect
          allowClear
          useCustomLabel
          isFullWidth
          attrName={attrName}
          defaultValue={"Line"}
          options={[
            {
              label: "Line chart",
              value: "Line",
            },
            {
              label: "Bar chart",
              value: "Bar",
            },
            {
              label: "Pie chart",
              value: "Pie",
            },
            {
              label: "ScatterPlot",
              value: "ScatterPlot",
            },
          ]}
          panelConfig={panelConfig}
          handleUpdatePanelConfig={handleUpdatePanelConfig}
          handleUpdateDsl={handleUpdateDsl}
        />
      </div>
      <DynamicSelectSetter
        useCustomLabel
        isFullWidth
        defaultValue={""}
        labelName={"X-axis values"}
        attrName={"xAxisValues"}
        panelConfig={panelConfig}
        handleUpdatePanelConfig={handleUpdatePanelConfig}
        handleUpdateDsl={handleUpdateDsl}
      />
      <DynamicSelectSetter
        useCustomLabel
        allowClear
        isFullWidth
        labelName={"Group by"}
        attrName={"groupBy"}
        defaultValue={defaultValue}
        panelConfig={panelConfig}
        handleUpdatePanelConfig={handleUpdatePanelConfig}
        handleUpdateDsl={handleUpdateDsl}
      />
      <DatasetsSetter
        attrName={"datasets"}
        panelConfig={panelConfig}
        handleUpdatePanelConfig={handleUpdatePanelConfig}
        handleUpdateDsl={handleUpdateDsl}
      />
    </div>
  )
}

ChartDataSetter.displayName = "ChartDataSetter"
