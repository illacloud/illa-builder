import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { RUN_SCRIPT_DOC_LINK } from "@illa-public/public-configs"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, DocsIcon } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/util"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/components/componentsSelector"
import {
  realInputValueWithScript,
  wrapperScriptCode,
} from "@/utils/evaluateDynamicString/valueConverter"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { BaseInputSetterProps } from "../interface"
import {
  applyInputSetterWrapperStyle,
  docComponentContainerStyle,
} from "./style"

const ScriptInput: FC<BaseInputSetterProps> = (props) => {
  const {
    className,
    placeholder,
    attrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    labelName,
    detailedDescription,
    labelDesc,
    widgetType,
  } = props

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

  const finalValue = useMemo(() => {
    let tempValue = value
    if (currentListDisplayName) {
      tempValue = realInputValueWithList(value, currentListDisplayName)
    }
    return realInputValueWithScript(tempValue, true)
  }, [currentListDisplayName, value])

  const onChange = useCallback(
    (value: string) => {
      let output = value
      if (
        currentListDisplayName &&
        hasDynamicStringSnippet(value ?? "") &&
        value.includes("currentItem")
      ) {
        output = getNeedComputedValueWithList(value, currentListDisplayName)
      }
      output = wrapperScriptCode(output, true)
      handleUpdateDsl(attrName, output)
    },
    [attrName, currentListDisplayName, handleUpdateDsl],
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

  return (
    <div css={applyInputSetterWrapperStyle}>
      <div css={docComponentContainerStyle}>
        <Link to={RUN_SCRIPT_DOC_LINK} target="_blank">
          <Button
            leftIcon={<DocsIcon />}
            colorScheme="grayBlue"
            variant="text"
            size="small"
          >
            {t("editor.inspect.header.action_menu.view_documentation")}
          </Button>
        </Link>
      </div>
      <CodeEditor
        scopeOfAutoComplete="page"
        className={className}
        value={finalValue}
        onChange={onChange}
        showLineNumbers={false}
        placeholder={placeholder}
        expectValueType={VALIDATION_TYPES.STRING}
        lang={CODE_LANG.JAVASCRIPT}
        maxHeight="208px"
        minHeight="120px"
        maxWidth="100%"
        codeType={CODE_TYPE.FUNCTION}
        modalTitle={labelName}
        canShowCompleteInfo
        modalDescription={detailedDescription ?? labelDesc}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

ScriptInput.displayName = "BaseInput"
export default ScriptInput
