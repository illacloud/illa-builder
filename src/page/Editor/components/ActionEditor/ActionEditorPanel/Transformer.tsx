import {
  actionCss,
  fillingCss,
  panelPaddingCss,
  panelSubBarCss,
  radioBtnStyle,
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
        <label css={sectionTitleCss}>
          {t("editor.action.panel.label.transformer")}
        </label>
        <span css={fillingCss} />
        <div css={radioBtnStyle}>
          <RadioGroup
            type="button"
            size="small"
            options={[
              t("editor.action.panel.btn.disable"),
              t("editor.action.panel.btn.enable"),
            ]}
            colorScheme="grayBlue"
            defaultValue="Disable"
          />
        </div>
      </div>
      <div css={panelPaddingCss}>
        <EditorInput mode="javascript" height="88px" />
      </div>
    </>
  )
}
