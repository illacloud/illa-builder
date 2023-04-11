import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { BaseDynamicSelect } from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ChartDataSourceSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
  const {
    handleUpdateDsl,
    widgetDisplayName,
    labelName,
    labelDesc,
    widgetType,
    attrName,
  } = props
  const actions = useSelector(getActionList)
  const isError = useSelector<RootState, boolean>((state) => {
    const errors = getExecutionError(state)
    const thisError = get(errors, `${widgetDisplayName}.dataSource`)
    return thisError?.length > 0
  })
  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, "dataSourceJS")
    } else {
      return get(targetComponentProps, "dataSource")
    }
  }, [isDynamic, targetComponentProps])

  const selectedOptions = useMemo(() => {
    return actions.map((action) => ({
      label: action.displayName,
      value: `{{${action.displayName}.data}}`,
    }))
  }, [actions])

  const handleClickFxButton = useCallback(() => {
    const isInOption = selectedOptions.some(
      (option) => option.value === finalValue,
    )
    if (isDynamic) {
      handleUpdateDsl("dataSourceMode", "select")
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "off",
      })
      if (!isInOption) {
        handleUpdateDsl("dataSource", "")
      } else {
        handleUpdateDsl("dataSource", finalValue)
      }
    } else {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "on",
      })
      handleUpdateDsl("dataSourceMode", "dynamic")
      if (isInOption) {
        handleUpdateDsl("dataSourceJS", finalValue)
      }
    }
  }, [
    selectedOptions,
    isDynamic,
    finalValue,
    handleUpdateDsl,
    widgetType,
    attrName,
  ])

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl("dataSourceJS", value)
    },
    [handleUpdateDsl],
  )

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateDsl("dataSource", value)
    },
    [handleUpdateDsl],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        {...props}
        isDynamic={isDynamic}
        onClickFxButton={handleClickFxButton}
        selectPlaceholder="Select a query or transformer"
        inputPlaceholder="{{}}"
        onChangeInput={handleChangeInput}
        path={`${widgetDisplayName}.dataSourceJS`}
        options={selectedOptions}
        expectedType={VALIDATION_TYPES.OBJECT}
        onChangeSelect={handleChangeSelect}
        value={finalValue}
        labelName={labelName}
        labelDesc={labelDesc}
        isError={isError}
      />
    </div>
  )
}

ChartDataSourceSetter.displayName = "ChartDataSourceSetter"
