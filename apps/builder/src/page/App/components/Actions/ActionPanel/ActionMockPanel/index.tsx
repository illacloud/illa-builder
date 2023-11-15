import { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Checkbox, Space } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { configActions } from "@/redux/config/configSlice"
import { ActionEventHandler } from "../ActionEventHandler"
import TriggerModeChoose from "../PanelHeader/TriggerModeChoose"
import { TransformerComponent } from "../TransformerComponent"
import { ActionMockPanelProps } from "./interface"
import {
  mockDataContainerStyle,
  mockDataTitleStyle,
  mockPanelContainerStyle,
  spaceStyle,
  triggerModeContainerStyle,
} from "./style"

const ActionMockPanel: FC<ActionMockPanelProps> = (props) => {
  const { mockData, enableForReleasedApp } = props

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleOnChangeMockData = (value: string) => {
    dispatch(
      configActions.updateCachedActionMockConfigReducer({
        mockData: value,
      }),
    )
  }

  const handleOnChangeEnableForReleasedApp = (checked: boolean) => {
    dispatch(
      configActions.updateCachedActionMockConfigReducer({
        enableForReleasedApp: checked,
      }),
    )
  }

  return (
    <>
      <div css={triggerModeContainerStyle}>
        <span css={mockDataTitleStyle}>{t("resources")}</span>
        <TriggerModeChoose />
      </div>
      <Space w="100%" h="8px" css={spaceStyle} disp="block" />
      <div css={mockPanelContainerStyle}>
        <div css={mockDataContainerStyle}>
          <span css={mockDataTitleStyle}>
            {t("editor.action.panel.option.mock.json")}
          </span>
          <CodeEditor
            value={mockData}
            showLineNumbers
            canShowCompleteInfo
            height="88px"
            lang={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.NO_METHOD_FUNCTION}
            onChange={handleOnChangeMockData}
          />
        </div>
        <Checkbox
          checked={enableForReleasedApp}
          colorScheme="techPurple"
          onChange={handleOnChangeEnableForReleasedApp}
        >
          {t("editor.action.panel.option.mock.on_deploy")}
        </Checkbox>
      </div>
      <TransformerComponent fullWidth />
      <Space w="100%" h="8px" disp="block" />
      <ActionEventHandler />
    </>
  )
}

export default memo(ActionMockPanel)
