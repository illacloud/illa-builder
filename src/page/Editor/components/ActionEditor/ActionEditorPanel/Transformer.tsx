import {
  actionCss,
  dashBorderBottomCss,
  fillingCss,
  panelPaddingCss,
  panelSubBarCss,
  sectionTitleCss,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/radio"
import { EditorInput } from "@/components/EditorInput"

export const Transformer = () => {
  const { t } = useTranslation()

  return (
    <>
      <div css={[actionCss, panelSubBarCss]}>
        <label css={[sectionTitleCss, dashBorderBottomCss]}>
          {t("editor.action.panel.label.transformer")}
        </label>
        <span css={fillingCss} />
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
      <div css={panelPaddingCss}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
