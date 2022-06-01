import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/radio"
import {
  actionStyle,
  fillingStyle,
  panelPaddingStyle,
  panelSubBarStyle,
  sectionTitleStyle,
  radioBtnStyle,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { EditorInput } from "@/components/EditorInput"

export const Transformer = () => {
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
            options={[
              t("editor.action.panel.btn.disable"),
              t("editor.action.panel.btn.enable"),
            ]}
            defaultValue="Disable"
          />
        </div>
      </div>
      <div css={panelPaddingStyle}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
