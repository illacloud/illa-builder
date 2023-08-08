import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Input } from "@illa-design/react"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { PageLabel } from "../Label"
import { ModalProps } from "./interface"
import {
  modalHeaderCloseIconHotSpot,
  modalHeaderWrapper,
  modalWrapperStyle,
  titleStyle,
} from "./style"

export const Modal: FC<ModalProps> = (props) => {
  const { onCloseModal, path, handleUpdateItem } = props
  const { t } = useTranslation()

  return (
    <div css={modalWrapperStyle}>
      <div css={modalHeaderWrapper}>
        <span css={titleStyle}>{t("editor.page.label_name.edit_view")}</span>
        <div css={modalHeaderCloseIconHotSpot} onClick={onCloseModal}>
          <CloseIcon />
        </div>
      </div>
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.view_path")}
          size="big"
          tooltip={t("editor.page.tooltips.view_path")}
        />
        <SetterPadding>
          <Input
            w="200px"
            value={path}
            colorScheme="techPurple"
            onChange={handleUpdateItem}
          />
        </SetterPadding>
      </LeftAndRightLayout>
    </div>
  )
}
