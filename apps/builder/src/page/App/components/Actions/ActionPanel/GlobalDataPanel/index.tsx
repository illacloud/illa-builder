import { GlobalDataActionContent } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import Space from "../Layout/Space"
import {
  globalDataPanelContainerStyle,
  inputAreaStyle,
  labelStyle,
  tipsStyle,
} from "./style"

const GlobalDataPanel: FC = () => {
  const currentAction = useSelector(getCachedAction)!
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleOnChangeValue = (value: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...currentAction,
        content: {
          initialValue: value,
        },
      }),
    )
  }

  return (
    <>
      <Space />
      <div css={globalDataPanelContainerStyle}>
        <span css={labelStyle}>
          {t("editor.data_work_space.global_data_modal.initial_value.label")}
        </span>
        <div css={inputAreaStyle}>
          <CodeEditor
            value={
              (currentAction.content as GlobalDataActionContent).initialValue
            }
            height="58px"
            onChange={handleOnChangeValue}
            modalTitle={t(
              "editor.data_work_space.global_data_modal.initial_value.label",
            )}
            modalDescription={t(
              "editor.data_work_space.global_data_modal.initial_value.tooltips",
            )}
            placeholder={t(
              "editor.data_work_space.global_data_modal.initial_value.placeholder",
            )}
          />
          <span css={tipsStyle}>
            {t("editor.action.panel.label.tips.global-data.how-to-use")}
          </span>
        </div>
      </div>
    </>
  )
}

GlobalDataPanel.displayName = "GlobalDataPanel"

export default GlobalDataPanel
