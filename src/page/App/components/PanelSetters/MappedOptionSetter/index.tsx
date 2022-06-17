import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { MappedOptionSetterProps } from "./interface"
import {
  labelAndInputWrapperCss,
  ListCss,
  listWrapperCss,
  modalInputWrapperCss,
  modalLabelCss,
  optionListHeaderCss,
} from "./style"
import { Input } from "@illa-design/input"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { getComputedValue } from "@/page/App/components/PanelSetters/MappedOptionSetter/utils"
import { v4 } from "uuid"
import { isEqual } from "lodash"
import { CodeEditor } from "@/components/CodeEditor"

interface configItem {
  id: string
  label: string
  value: string
  disabled?: string
}

export const MappedOptionSetter: FC<MappedOptionSetterProps> = (props) => {
  const { globalData } = useContext(GLOBAL_DATA_CONTEXT)

  const { attrName, panelConfig, handleUpdateDsl } = props

  const childrenPanelConfig = panelConfig[attrName] ?? ({} as configItem)

  const [labelValue, setLabelValue] = useState(childrenPanelConfig.label ?? "")
  const [optionValue, setOptionValue] = useState(
    childrenPanelConfig.value ?? "",
  )
  const [disabledValue, setDisabledValue] = useState(
    childrenPanelConfig.disabled ?? "",
  )
  //
  // const handleUpdate = useCallback(
  //   (value: Partial<configItem>) => {
  //     const newChildrenPanelConfig = { ...childrenPanelConfig, ...value }
  //     handleUpdateDsl({ [attrName]: newChildrenPanelConfig })
  //   },
  //   [childrenPanelConfig, attrName, handleUpdateDsl],
  // )
  //
  // const realDataSources = useMemo(() => {
  //   const dynamicSources = panelConfig.dataSources ?? "{{[]}}"
  //   let res = []
  //   try {
  //     res = evaluateDynamicString(panelConfig.id, dynamicSources, {
  //       ...globalData,
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   return res
  // }, [panelConfig, globalData])
  //
  // const getRealValue = useCallback(
  //   (jsString: string, keyInDataTree: string) => {
  //     const realJS = getComputedValue(jsString)
  //     let res = []
  //     try {
  //       res = evaluateDynamicString(keyInDataTree, realJS, {
  //         ...globalData,
  //         dataOptions: realDataSources,
  //       })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //
  //     return res
  //   },
  //   [globalData, realDataSources],
  // )
  //
  // const calcData = useMemo(() => {
  //   const options: configItem[] = []
  //   const keyInDataTree = panelConfig.id
  //   const realLabelValue = getRealValue(labelValue || "{{item}}", keyInDataTree)
  //   const realOptionValue = getRealValue(
  //     optionValue || "{{item}}",
  //     keyInDataTree,
  //   )
  //   const realDisabledValue = getRealValue(disabledValue, keyInDataTree)
  //   const maxLength = Math.max(
  //     realLabelValue.length,
  //     realOptionValue.length,
  //     realDisabledValue.length,
  //   )
  //   for (let i = 0; i < maxLength; i++) {
  //     const label = realLabelValue[i] ?? ""
  //     const value = realOptionValue[i] ?? ""
  //     const disabled = realDisabledValue[i] ?? false
  //     options.push({
  //       id: `option-${v4()}`,
  //       label,
  //       value,
  //       disabled,
  //     })
  //   }
  //   return options
  // }, [getRealValue, labelValue, optionValue, disabledValue])
  //
  // useEffect(() => {
  //   const oldOptions = childrenPanelConfig.options ?? []
  //   if (isEqual(oldOptions, calcData)) return
  //   handleUpdateDsl({ options: calcData })
  // }, [handleUpdateDsl, calcData])

  return (
    <div css={ListCss}>
      <div css={optionListHeaderCss}>
        <div>Mapped Option</div>
      </div>
      <div css={listWrapperCss}>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Value</span>
          <div css={modalInputWrapperCss}>
            <CodeEditor
              value={optionValue}
              expectedType="Object"
              mode="TEXT_JS"
              onChange={(value, calcResult) => {
                setOptionValue(value)
                // handleUpdate({ value })
              }}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Label</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={labelValue}
              placeholder="{{item}}"
              onChange={(value) => {
                setLabelValue(value)
                // handleUpdate({ label: value })
              }}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Disabled</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={disabledValue}
              onChange={;(value) => {
                setDisabledValue(value)
                // handleUpdate({ disabled: value })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

MappedOptionSetter.displayName = "MappedOptionSetter"
