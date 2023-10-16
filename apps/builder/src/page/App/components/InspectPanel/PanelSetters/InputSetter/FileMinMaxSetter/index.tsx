import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
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
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/util"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FileMinMaxSetterProps } from "./interface"
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
} from "./style"

const options = [
  { label: "KB", value: "kb" },
  { label: "MB", value: "mb" },
]

const FileMinMaxSetter: FC<FileMinMaxSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    handleUpdateDsl,
    widgetDisplayName,
    placeholder,
    componentNode,
  } = props

  const sizeType = componentNode?.props?.sizeType ?? ""
  const maxSize = componentNode?.props?.maxSize ?? ""
  const minSize = componentNode?.props?.minSize ?? ""

  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const { t } = useTranslation()

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

  const finalMaxSize = useMemo(() => {
    if (currentListDisplayName) {
      return realInputValueWithList(maxSize, currentListDisplayName)
    }
    return maxSize
  }, [currentListDisplayName, maxSize])

  const finalMinSize = useMemo(() => {
    if (currentListDisplayName) {
      return realInputValueWithList(minSize, currentListDisplayName)
    }
    return minSize
  }, [currentListDisplayName, minSize])

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
    handleUpdateDsl("sizeType", value)
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
                <div css={sizeSelectionStyle}>{sizeType?.toUpperCase()}</div>
                {popupVisible ? <UpIcon /> : <DownIcon />}
              </div>
            </Trigger>
          )}
        </div>
      </div>
      <div css={codeEditorContainerStyle}>
        <CodeEditor
          scopeOfAutoComplete="page"
          wrapperCss={codeEditorWrapperStyle}
          value={finalMinSize}
          onChange={(value) => onChange(value, "minSize")}
          showLineNumbers={false}
          expectValueType={VALIDATION_TYPES.NUMBER}
          lang={CODE_LANG.JAVASCRIPT}
          maxHeight="208px"
          placeholder={placeholder}
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
          modalTitle={t("editor.inspect.setter_label.max_size")}
        />
        <div css={dashCharStyle}>~</div>
        <CodeEditor
          scopeOfAutoComplete="page"
          wrapperCss={codeEditorWrapperStyle}
          value={finalMaxSize}
          onChange={(value) => onChange(value, "maxSize")}
          showLineNumbers={false}
          expectValueType={VALIDATION_TYPES.NUMBER}
          lang={CODE_LANG.JAVASCRIPT}
          placeholder={placeholder}
          maxHeight="208px"
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
          modalTitle={t("editor.inspect.setter_label.min_size")}
        />
      </div>
    </div>
  )
}
FileMinMaxSetter.displayName = "FileMinMaxSetter"
export default FileMinMaxSetter
