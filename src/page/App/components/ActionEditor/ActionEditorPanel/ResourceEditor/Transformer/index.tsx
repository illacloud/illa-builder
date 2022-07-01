import { FC } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/radio"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import {
  actionStyle,
  fillingStyle,
  panelPaddingStyle,
  panelSubBarStyle,
  sectionTitleStyle,
  radioBtnStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { CodeEditor } from "@/components/CodeEditor"
import { disableTransformerStyle } from "./style"
import { TransformerProps } from "./interface"

export const Transformer: FC<TransformerProps> = (props) => {
  const { onChange } = props
  const selectedAction = useSelector(getSelectedAction)
  const { transformer = "", enableTransformer = false } =
    selectedAction.actionTemplate ?? {}
  const { t } = useTranslation()

  return (
    <>
      <div css={css(actionStyle, panelSubBarStyle)}>
        <label css={sectionTitleStyle}>
          {t("editor.action.panel.label.transformer")}
        </label>
        <span css={fillingStyle} />
        <div css={radioBtnStyle}>
          <RadioGroup
            type="button"
            size="small"
            colorScheme="techPurple"
            options={[
              {
                value: false,
                label: t("editor.action.panel.btn.disable"),
              },
              {
                value: true,
                label: t("editor.action.panel.btn.enable"),
              },
            ]}
            value={enableTransformer}
            onChange={(value) => onChange({ enableTransformer: value })}
          />
        </div>
      </div>
      <div css={panelPaddingStyle}>
        {enableTransformer ? (
          <CodeEditor
            mode="TEXT_JS"
            expectedType="String"
            height="88px"
            value={transformer}
            onChange={(value) => onChange({ transformer: value })}
          />
        ) : (
          <div css={disableTransformerStyle}>
            {t("editor.action.panel.tips.transformer")}
          </div>
        )}
      </div>
    </>
  )
}
