import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback } from "react"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { DynamicIcon } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/DynamicIcon"
import { BaseDynamicSelectSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/interface"
import {
  basicDynamicSetterContainerStyle,
  dynamicSelectHeaderStyle,
  dynamicSelectSetterStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
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
    },
    [onChangeSelect],
  )

  return (
    <div css={basicDynamicSetterContainerStyle}>
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
            scopeOfAutoComplete="page"
          />
        ) : (
          <Select
            colorScheme="techPurple"
            placeholder={selectPlaceholder}
            options={options}
            value={value}
            onChange={onChangeSelectInner}
            showSearch
            allowClear
            error={isError}
          />
        )}
      </div>
    </div>
  )
}

BaseDynamicSelect.displayName = "BaseDynamicSelect"

export default BaseDynamicSelect
