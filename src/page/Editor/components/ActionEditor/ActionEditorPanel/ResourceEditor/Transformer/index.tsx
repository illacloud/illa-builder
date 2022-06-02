import { useState } from "react"
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
import { disableTransformerStyle } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer/style"

export const Transformer = () => {
  const { t } = useTranslation()
  const [enable, setEnable] = useState<"Enable" | "Disable">("Disable")
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
            value={enable}
            onChange={(value: "Enable" | "Disable") => {
              setEnable(value)
            }}
          />
        </div>
      </div>
      <div css={panelPaddingStyle}>
        {enable === "Enable" ? (
          <EditorInput mode="javascript" height="88px" />
        ) : (
          <div css={disableTransformerStyle}>
            {t("editor.action.panel.tips.transformer")}
          </div>
        )}
      </div>
    </>
  )
}
