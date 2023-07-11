import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import BaseDynamicSelect from "@/page/App/components/PanelSetters/SelectSetter/baseDynamicSelect"
import { BaseDynamicSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"

export interface DynamicSelectSetterProps extends BaseDynamicSelectSetterProps {
  inputPlaceholder?: string
  selectPlaceholder?: string
  isDynamicAttrName?: string
  selectAttrName?: string
  inputAttrName?: string
}

const DynamicSelectSetter: FC<DynamicSelectSetterProps> = (props) => {
  const {
    handleUpdateDsl,
    widgetDisplayName,
    labelName,
    labelDesc,
    inputPlaceholder = "{{}}",
    selectPlaceholder,
    isDynamicAttrName,
    selectAttrName,
    inputAttrName,
    parentAttrName,
    options,
  } = props

  const isError = useSelector<RootState, boolean>((state) => {
    const errors = getExecutionError(state)
    const thisError = get(errors, `${parentAttrName}.${selectAttrName}`)
    return thisError?.length > 0
  })
  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      return searchDSLByDisplayName(widgetDisplayName, rootState)?.props || {}
    },
  )

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(
      targetComponentProps,
      `${parentAttrName}.${isDynamicAttrName}`,
      "select",
    )
    return dataSourceMode === "dynamic"
  }, [targetComponentProps, parentAttrName, isDynamicAttrName])

  const finalValue = useMemo(() => {
    if (isDynamic) {
      return get(targetComponentProps, `${parentAttrName}.${inputAttrName}`)
    } else {
      return get(targetComponentProps, `${parentAttrName}.${selectAttrName}`)
    }
  }, [
    isDynamic,
    targetComponentProps,
    parentAttrName,
    inputAttrName,
    selectAttrName,
  ])

  const handleClickFxButton = useCallback(() => {
    const isInOption =
      Array.isArray(options) && options.some((option) => option === finalValue)
    if (isDynamic) {
      handleUpdateDsl(`${parentAttrName}.${isDynamicAttrName}`, "select")
      if (!isInOption) {
        handleUpdateDsl(`${parentAttrName}.${selectAttrName}`, "")
      } else {
        handleUpdateDsl(`${parentAttrName}.${selectAttrName}`, finalValue)
      }
    } else {
      handleUpdateDsl(`${parentAttrName}.${isDynamicAttrName}`, "dynamic")
      if (isInOption) {
        handleUpdateDsl(`${parentAttrName}.${inputAttrName}`, finalValue)
      }
    }
  }, [
    handleUpdateDsl,
    isDynamic,
    finalValue,
    parentAttrName,
    selectAttrName,
    inputAttrName,
    options,
    isDynamicAttrName,
  ])

  const handleChangeInput = useCallback(
    (value: string) => {
      handleUpdateDsl(`${parentAttrName}.${inputAttrName}`, value)
    },
    [handleUpdateDsl, parentAttrName, inputAttrName],
  )

  const handleChangeSelect = useCallback(
    (value: any) => {
      handleUpdateDsl(`${parentAttrName}.${selectAttrName}`, value)
    },
    [handleUpdateDsl, parentAttrName, selectAttrName],
  )

  return (
    <div css={publicPaddingStyle}>
      <BaseDynamicSelect
        {...props}
        isDynamic={isDynamic}
        onClickFxButton={handleClickFxButton}
        selectPlaceholder={selectPlaceholder}
        inputPlaceholder={inputPlaceholder}
        onChangeInput={handleChangeInput}
        path={`${parentAttrName}.${inputAttrName}`}
        options={options}
        onChangeSelect={handleChangeSelect}
        value={finalValue}
        labelName={labelName}
        labelDesc={labelDesc}
        isError={isError}
      />
    </div>
  )
}

DynamicSelectSetter.displayName = "DynamicSelectSetter"

export default DynamicSelectSetter
