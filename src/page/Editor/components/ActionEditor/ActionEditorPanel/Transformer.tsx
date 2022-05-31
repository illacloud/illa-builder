import {
  actionStyle,
  dashBorderBottomStyle,
  fillingStyle,
  panelPaddingStyle,
  panelSubBarStyle,
  sectionTitleStyle,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/radio"
import { EditorInput } from "@/components/EditorInput"

export const Transformer = () => {
  const { t } = useTranslation()

  return (
    <>
      <div css={[actionStyle, panelSubBarStyle]}>
        <label css={[sectionTitleStyle, dashBorderBottomStyle]}>
          {t("editor.action.panel.label.transformer")}
        </label>
        <span css={fillingStyle} />
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
      <div css={panelPaddingStyle}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
