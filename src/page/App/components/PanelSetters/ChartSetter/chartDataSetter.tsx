import { FC, useCallback, useEffect, useMemo, useState } from "react"

import {
  DynamicSelectSetter,
  INPUT_MODE,
  INPUT_MODE_SUFFIX,
  JS_VALUE_SUFFIX,
} from "../SelectSetter/dynamicSelect"
import { getDefaultColorScheme, initData } from "@/widgetLibrary/Chart/utils"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  DatasetConfig,
  defaultChartData,
  defaultChartData02,
} from "@/widgetLibrary/Chart/interface"
import { DatasetsSetter } from "@/page/App/components/PanelSetters/ChartSetter/DatasetsSetter"
import { CHART_DATASET_CONFIG } from "@/widgetLibrary/Chart/panelConfig"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { get } from "lodash"
import { Setter } from "@/page/App/components/InspectPanel/setter"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { t } from "i18next"

const DATA_SOURCE = "dataSource"
const X_AXIS_VALUES = "xAxisValues"
const X_AXIS_VALUES_OPTIONS = "xAxisValuesOptions"
const GROUP_BY = "groupBy"
const GROUP_BY_OPTIONS = "groupByOptions"
const DATA = "data"
const DATASETS = "datasets"
// data source
const DATA_SOURCE_TMP = "DATA_SOURCE_TMP"

const TYPE = "type"

const CHART_TYPE_OPTIONS = [
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
]

export const ChartDataSetter: FC<BaseSetter> = (props) => {
  const { handleUpdateDsl, panelConfig, widgetDisplayName, parentAttrName } =
    props

  // Ensure only one update when input js code
  const [updateDataAfterJsEnter, setUpdateDataAfterJsEnter] = useState(true)

  useEffect(() => {
    handleUpdateDsl(DATA_SOURCE_TMP, {
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

  const executionResult = useSelector(getExecutionResult)
  const res = useMemo(() => {
    return get(
      executionResult,
      widgetDisplayName + "." + DATA_SOURCE + JS_VALUE_SUFFIX,
    )
  }, [executionResult])

  // update right panel when dataSource changed
  const initChartRightPanel = useCallback(
    (data) => {
      handleUpdateDsl(X_AXIS_VALUES_OPTIONS, data?.xAxis)
      handleUpdateDsl(GROUP_BY_OPTIONS, data?.groupBy)
      handleUpdateDsl(GROUP_BY, undefined)
      handleUpdateDsl(DATASETS, data?.datasets)
      handleUpdateDsl(X_AXIS_VALUES, data?.xAxis?.[0])
    },
    [handleUpdateDsl],
  )

  useEffect(() => {
    if (
      panelConfig?.[DATA_SOURCE + INPUT_MODE_SUFFIX] === INPUT_MODE.JAVASCRIPT
    ) {
      const _data = initData(res, panelConfig.type)
      if (res && updateDataAfterJsEnter && _data) {
        initChartRightPanel(_data)
        handleUpdateDsl(DATA, res)
        setUpdateDataAfterJsEnter(false)
      }
    }
  }, [res])

  const handleDataEnter = useCallback(
    (attrName: string, value: any) => {
      handleUpdateDsl(attrName, value)
      if (attrName.indexOf(INPUT_MODE_SUFFIX) < 0) {
        if (
          panelConfig?.[DATA_SOURCE + INPUT_MODE_SUFFIX] === INPUT_MODE.USE_DROP
        ) {
          const _data = initData(
            panelConfig[DATA_SOURCE_TMP]?.[value],
            panelConfig.type,
          )
          if (_data) {
            handleUpdateDsl(DATA, panelConfig[DATA_SOURCE_TMP]?.[value])
            initChartRightPanel(_data)
          }
        } else {
          setUpdateDataAfterJsEnter(true)
        }
      }
    },
    [handleUpdateDsl, panelConfig],
  )

  const handleGroupByChange = useCallback(
    (value) => {
      handleUpdateDsl(GROUP_BY, value)
      const data = panelConfig?.data
      const groups = Array.from(new Set(data?.map((item: any) => item[value])))
      const _lineColor = groups.map((item: any, index: number) =>
        getDefaultColorScheme(index),
      )
      const _datasets = panelConfig?.datasets?.map((item: DatasetConfig) => ({
        ...item,
        lineColor: _lineColor,
      }))
      handleUpdateDsl("datasets", _datasets)
    },
    [handleUpdateDsl, panelConfig],
  )

  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = singleSelectedComponentNode?.type || ""

  const widgetParentDisplayName = singleSelectedComponentNode?.parentNode || ""

  const widgetProps = singleSelectedComponentNode?.props || {}

  return (
    <div>
      <DynamicSelectSetter
        widgetOrAction="WIDGET"
        widgetType=""
        expectedType={VALIDATION_TYPES.ARRAY}
        widgetDisplayName={widgetDisplayName}
        isSetterSingleRow
        labelName={t("editor.inspect.setter_label.data_source")}
        attrName={DATA_SOURCE}
        panelConfig={panelConfig}
        handleUpdateDsl={handleDataEnter}
        parentAttrName={parentAttrName}
      />
      <Setter
        parentAttrName=""
        attrName={TYPE}
        expectedType={VALIDATION_TYPES.STRING}
        labelName={t("editor.inspect.setter_label.chart_type")}
        labelDesc="x xx"
        isSetterSingleRow={true}
        isInList={false}
        options={CHART_TYPE_OPTIONS}
        setterType="BASE_SELECT_SETTER"
        defaultValue={panelConfig?.type}
      />

      <Setter
        parentAttrName=""
        attrName={X_AXIS_VALUES}
        expectedType={VALIDATION_TYPES.STRING}
        labelName={t("editor.inspect.setter_label.x_values")}
        labelDesc="x xx"
        isSetterSingleRow={true}
        isInList={false}
        setterType="BASE_SELECT_SETTER"
        defaultValue={panelConfig?.xAxisValues}
        options={panelConfig?.xAxisValuesOptions}
      />

      {panelConfig?.type !== "pie" && (
        <SelectedPanelContext.Provider
          value={{
            widgetType: widgetType,
            widgetDisplayName: widgetDisplayName,
            widgetProps: widgetProps,
            widgetOrAction: "WIDGET",
            widgetParentDisplayName: null,
            handleUpdateDsl: (attrPath, value) => {
              handleGroupByChange(value)
            },
          }}
        >
          <Setter
            parentAttrName=""
            attrName={GROUP_BY}
            expectedType={VALIDATION_TYPES.STRING}
            labelName={t("editor.inspect.setter_label.group_by")}
            labelDesc="x xx"
            isSetterSingleRow={true}
            isInList={false}
            setterType="ALLOW_CLEAR_SELECT_SETTER"
            defaultValue={panelConfig?.groupBy}
            options={panelConfig?.groupByOptions}
          />
        </SelectedPanelContext.Provider>
      )}
      <DatasetsSetter
        widgetOrAction="WIDGET"
        widgetType=""
        expectedType={VALIDATION_TYPES.STRING}
        widgetDisplayName={widgetDisplayName}
        handleUpdateDsl={handleUpdateDsl}
        attrName={DATASETS}
        value={panelConfig?.datasets}
        childrenSetter={CHART_DATASET_CONFIG}
      />
    </div>
  )
}

ChartDataSetter.displayName = "ChartDataSetter"
