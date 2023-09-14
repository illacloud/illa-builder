import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PageLabel } from "../../../../Components/Label"
import {
  labelContainerStyle,
  sectionContainerStyle,
  setterContainerStyle,
} from "../../style"
import ColorPickerSetter from "../ColorSetter"

export const BackgroundSetter: FC = () => {
  const { t } = useTranslation()
  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.background")}
          size="big"
        />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel labelName={t("editor.page.label_name.body")} size="small" />
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.header")}
          size="small"
        />
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.left_panel")}
          size="small"
        />
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.right_panel")}
          size="small"
        />
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </div>
      <div css={setterContainerStyle}>
        <PageLabel
          labelName={t("editor.page.label_name.footer")}
          size="small"
        />
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </div>
    </section>
  )
}
