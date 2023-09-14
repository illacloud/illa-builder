import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PlusIcon } from "@illa-design/react"
import { PageLabel } from "../../../../Components/Label"
import {
  iconHotSpotContainerStyle,
  labelContainerStyle,
  sectionContainerStyle,
} from "../../style"
import { DeleteActionContainer } from "../DelteActionContainer"
import ShadowSelect from "../ShadowSelect"
import { SHADOW_VALUE } from "../ShadowSelect/constants"

export const ShadowSetter: FC = () => {
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
        <ShadowSelect value={SHADOW_VALUE.NONE} onChange={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.right_panel")}
        onClickDelete={() => {}}
      >
        <ShadowSelect value={SHADOW_VALUE.SMALL} onChange={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.header")}
        onClickDelete={() => {}}
      >
        <ShadowSelect value={SHADOW_VALUE.LARGE} onChange={() => {}} />
      </DeleteActionContainer>
      <DeleteActionContainer
        labelName={t("editor.page.label_name.footer")}
        onClickDelete={() => {}}
      >
        <ShadowSelect value={SHADOW_VALUE.MEDIUM} onChange={() => {}} />
      </DeleteActionContainer>
    </section>
  )
}
