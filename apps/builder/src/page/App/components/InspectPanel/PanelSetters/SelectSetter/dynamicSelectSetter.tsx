import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import BaseDynamicSelect from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseDynamicSelect"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { BaseSelectSetterProps } from "./interface"

const DynamicSelectSetter: FC<BaseSelectSetterProps> = (props) => {
  const {
    widgetDisplayName,
    attrName,
    value,
    labelName,
    labelDesc,
    options,
    defaultValue,
    handleUpdateMultiAttrDSL,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const handleUpdateDsl = useCallback(
    (attrName: string, newValue: any) => {
      handleUpdateMultiAttrDSL?.({
        [attrName]: newValue,
      })
    },
    [handleUpdateMultiAttrDSL],
  )

  const executionErrors = useSelector(getExecutionError)
  const isError = useMemo(() => {
    return (
      (executionErrors[`${widgetDisplayName}.${attrName}JS`] ?? [])?.length > 0
    )
  }, [attrName, executionErrors, widgetDisplayName])

  const isDynamic =
    get(
      targetComponentProps,
      `${widgetDisplayName}.${attrName}JS`,
      "select",
    ) === "dynamic"

  const handleClickFxButton = useCallback(() => {
    if (isDynamic) {
      handleUpdateDsl(`${widgetDisplayName}.${attrName}JS`, "select")
      handleUpdateDsl(attrName, defaultValue)
    } else {
      handleUpdateDsl(`${widgetDisplayName}.${attrName}JS`, "dynamic")
    }
  }, [attrName, defaultValue, handleUpdateDsl, isDynamic, widgetDisplayName])

  const handleChangeSelect = useCallback(
    (value: string) => {
      handleUpdateDsl?.(attrName, value)
    },
    [attrName, handleUpdateDsl],
  )

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl(attrName, value)
    },
    [attrName, handleUpdateDsl],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        {...props}
        isDynamic={isDynamic}
        options={options}
        onClickFxButton={handleClickFxButton}
        onChangeSelect={handleChangeSelect}
        value={value}
        onChangeInput={handleChangeInput}
        expectedType={VALIDATION_TYPES.STRING}
        path={`${widgetDisplayName}.${attrName}`}
        labelName={labelName}
        labelDesc={labelDesc}
        isError={isError}
      />
    </div>
  )
}

DynamicSelectSetter.displayName = "DynamicSelectSetter"

export default DynamicSelectSetter
