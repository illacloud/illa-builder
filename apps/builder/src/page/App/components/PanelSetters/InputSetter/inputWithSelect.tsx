import { t } from "i18next"
import { FC, useCallback, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"
import {
  DownIcon,
  Input,
  Select,
  Trigger,
  UpIcon,
  isNumber,
  isString,
} from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { InputWithSelectSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  codeEditorWrapperStyle,
  inputWithSelectSetterSelectStyle,
  inputWithSelectSetterStyle,
  sizeContainerStyle,
  sizeDropListCodeEditorStyle,
  sizeDropListStyle,
  sizeSelectionStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/PanelSetters/InputSetter/util"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"

import className = ReactMarkdown.propTypes.className

export const InputWithSelectSetter: FC<InputWithSelectSetterProps> = (
  props,
) => {
  const {
    attrName,
    attrNames,
    panelConfig,
    handleUpdateDsl,
    value,
    values,
    options,
    widgetDisplayName,
    widgetType,
    expectedType,
    widgetOrAction,
  } = props

  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  const listWidgets = useSelector(
    getContainerListDisplayNameMappedChildrenNodeDisplayName,
  )

  const currentListDisplayName = useMemo(() => {
    const listWidgetDisplayNames = Object.keys(listWidgets)
    for (let i = 0; i < listWidgetDisplayNames.length; i++) {
      if (listWidgets[listWidgetDisplayNames[i]].includes(widgetDisplayName)) {
        return listWidgetDisplayNames[i]
      }
    }
    return ""
  }, [listWidgets, widgetDisplayName])

  const finalValue = useMemo(() => {
    if (currentListDisplayName) {
      return realInputValueWithList(value, currentListDisplayName)
    }
    return value || ""
  }, [currentListDisplayName, value])

  const onChange = useCallback(
    (value: string) => {
      let output = value
      if (currentListDisplayName) {
        output = getNeedComputedValueWithList(value, currentListDisplayName)
      }

      handleUpdateDsl(attrName, output)
    },
    [attrName, currentListDisplayName, handleUpdateDsl],
  )

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  return (
    <div css={inputWithSelectSetterStyle}>
      <div css={sizeDropListCodeEditorStyle}>
        <CodeEditor
          wrapperCss={codeEditorWrapperStyle}
          value={finalValue}
          onChange={onChange}
          showLineNumbers={false}
          expectValueType={expectedType}
          lang={CODE_LANG.JAVASCRIPT}
          maxHeight="208px"
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
        />
        {options && (
          <Trigger
            trigger="click"
            colorScheme="white"
            position="bottom-start"
            withoutPadding
            showArrow={false}
            popupVisible={popupVisible}
            onVisibleChange={onVisibleChange}
            content={
              <div css={sizeDropListStyle}>
                {options.map((option) => {
                  let label
                  let value: number | string
                  if (isString(option) || isNumber(option)) {
                    label = value = option
                  } else {
                    label = option.label
                    value = option.value
                  }
                  return (
                    <div
                      key={value}
                      onClick={() => {
                        handleUpdateDsl(attrNames?.[1] || attrName, value)
                        onVisibleChange(false)
                      }}
                    >
                      {label}
                    </div>
                  )
                })}
              </div>
            }
          >
            <div css={sizeContainerStyle}>
              <div css={sizeSelectionStyle}>{values[1].toUpperCase()}</div>
              {popupVisible ? <UpIcon /> : <DownIcon />}
            </div>
          </Trigger>
        )}
      </div>
    </div>
  )
}
InputWithSelectSetter.displayName = "InputWithSelectSetter"
