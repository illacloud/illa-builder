import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback } from "react"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"
import { BaseDynamicSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import {
  dynamicSelectHeaderStyle,
  dynamicSelectSetterStyle,
} from "@/page/App/components/PanelSetters/SelectSetter/style"
import { trackInEditor } from "@/utils/mixpanelHelper"

const BaseDynamicSelect: FC<BaseDynamicSelectSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    isDynamic,
    onClickFxButton,
    value,
    onChangeInput,
    onChangeSelect,
    expectedType,
    options,
    selectPlaceholder,
    inputPlaceholder,
    isError,
    widgetType,
    attrName,
    detailedDescription,
  } = props

  const handleClickFxButton = useCallback(() => {
    if (isDynamic) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "off",
      })
    } else {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "on",
      })
    }
    onClickFxButton?.()
  }, [attrName, isDynamic, onClickFxButton, widgetType])

  const onChangeSelectInner = useCallback(
    (value: any) => {
      onChangeSelect(value)
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
        element: "component_inspect_select",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: value,
      })
    },
    [attrName, onChangeSelect, widgetType],
  )

  const onFocus = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "component_inspect_code_mirror",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  const onBlur = useCallback(
    (value: string) => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "component_inspect_code_mirror",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: value.length,
      })
    },
    [attrName, widgetType],
  )

  const onClick = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "component_inspect_select",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  return (
    <>
      <div css={dynamicSelectHeaderStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <DynamicIcon
          isDynamic={isDynamic}
          onClick={handleClickFxButton}
          hasRightContent={false}
        />
      </div>
      <div css={dynamicSelectSetterStyle}>
        {isDynamic ? (
          <CodeEditor
            value={value ?? ""}
            onChange={onChangeInput}
            showLineNumbers={false}
            placeholder={inputPlaceholder}
            expectValueType={expectedType}
            lang={CODE_LANG.JAVASCRIPT}
            maxHeight="208px"
            minHeight="30px"
            maxWidth="100%"
            codeType={CODE_TYPE.EXPRESSION}
            modalTitle={labelName}
            modalDescription={labelDesc ?? detailedDescription}
            onFocus={onFocus}
            onBlur={onBlur}
            scopeOfAutoComplete="page"
          />
        ) : (
          <Select
            colorScheme="techPurple"
            placeholder={selectPlaceholder}
            options={options}
            value={value}
            onChange={onChangeSelectInner}
            onClick={onClick}
            showSearch
            allowClear
            error={isError}
          />
        )}
      </div>
    </>
  )
}

BaseDynamicSelect.displayName = "BaseDynamicSelect"

export default BaseDynamicSelect
