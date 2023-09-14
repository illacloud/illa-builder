import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PlusIcon } from "@illa-design/react"
import { PageLabel } from "../../../../Components/Label"
import {
  iconHotSpotContainerStyle,
  labelContainerStyle,
  sectionContainerStyle,
} from "../../style"
import ColorPickerSetter from "../ColorSetter"
import { DeleteActionContainer } from "../DelteActionContainer"

export const DividerSetter: FC = () => {
  const { t } = useTranslation()

  return (
    <section css={sectionContainerStyle}>
      <div css={labelContainerStyle}>
        <PageLabel
          labelName={t("editor.inspect.setter_group.divider")}
          size="big"
        />
        <span css={iconHotSpotContainerStyle}>
          <PlusIcon />
        </span>
      </div>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.left_panel")}
        onClickDelete={() => {}}
      >
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.right_panel")}
        onClickDelete={() => {}}
      >
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.header")}
        onClickDelete={() => {}}
      >
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.footer")}
        onClickDelete={() => {}}
      >
        <ColorPickerSetter value="white" handleUpdateColor={() => {}} />
      </DeleteActionContainer>
    </section>
  )
}
