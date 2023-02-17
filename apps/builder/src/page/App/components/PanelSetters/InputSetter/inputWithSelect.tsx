import { FC, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import {
  DownIcon,
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
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { InputWithSelectSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  codeEditorContainerStyle,
  codeEditorWrapperStyle,
  dashCharStyle,
  dropListItemStyle,
  inputWithSelectSetterStyle,
  labelContainerStyle,
  panelLabelContainerStyle,
  sizeContainerStyle,
  sizeDropListStyle,
  sizeSelectionStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/PanelSetters/InputSetter/util"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"

export const InputWithSelectSetter: FC<InputWithSelectSetterProps> = (
  props,
) => {
  const {
    labelName,
    labelDesc,
    attrName,
    attrNames,
    handleUpdateDsl,
    value,
    options,
    widgetDisplayName,
    expectedType,
    placeholder,
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

  const finalValues = useMemo(() => {
    return value.map((value: string) => {
      if (currentListDisplayName) {
        return realInputValueWithList(value, currentListDisplayName)
      }
      return value || ""
    })
  }, [currentListDisplayName, value])

  const onChange = useCallback(
    (value: string, attrName: string) => {
      let output = value
      if (currentListDisplayName) {
        output = getNeedComputedValueWithList(value, currentListDisplayName)
      }

      handleUpdateDsl(attrName, output)
    },
    [currentListDisplayName, handleUpdateDsl],
  )

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  const handleOptionsItemClick = (value: string | number) => {
    handleUpdateDsl(attrNames?.[2] || attrName, value)
    onVisibleChange(false)
  }

  return (
    <div css={inputWithSelectSetterStyle}>
      <div css={labelContainerStyle}>
        <div css={panelLabelContainerStyle}>
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        </div>
        <div>
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
                        css={dropListItemStyle}
                        key={value}
                        onClick={() => handleOptionsItemClick(value)}
                      >
                        {label}
                      </div>
                    )
                  })}
                </div>
              }
            >
              <div css={sizeContainerStyle}>
                <div css={sizeSelectionStyle}>{value[2]?.toUpperCase()}</div>
                {popupVisible ? <UpIcon /> : <DownIcon />}
              </div>
            </Trigger>
          )}
        </div>
      </div>
      <div css={codeEditorContainerStyle}>
        <CodeEditor
          wrapperCss={codeEditorWrapperStyle}
          value={finalValues[0]}
          onChange={(value) => onChange(value, attrName?.[0] || attrName)}
          showLineNumbers={false}
          expectValueType={expectedType?.[0] ?? expectedType}
          lang={CODE_LANG.JAVASCRIPT}
          maxHeight="208px"
          placeholder={placeholder}
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
        />
        <div css={dashCharStyle}>~</div>
        <CodeEditor
          wrapperCss={codeEditorWrapperStyle}
          value={finalValues[1]}
          onChange={(value) => onChange(value, attrName?.[1] || attrName)}
          showLineNumbers={false}
          expectValueType={expectedType?.[1] ?? expectedType}
          lang={CODE_LANG.JAVASCRIPT}
          placeholder={placeholder}
          maxHeight="208px"
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
        />
      </div>
    </div>
  )
}
InputWithSelectSetter.displayName = "InputWithSelectSetter"
