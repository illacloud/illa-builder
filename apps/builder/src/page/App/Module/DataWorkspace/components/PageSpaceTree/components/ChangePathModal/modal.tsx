import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Input } from "@illa-design/react"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { ModalProps } from "./interface"
import {
  modalHeaderCloseIconHotSpot,
  modalHeaderWrapper,
  modalWrapperStyle,
  titleStyle,
} from "./style"

export const Modal: FC<ModalProps> = (props) => {
  const { onCloseModal, path, handleUpdateItem, isParentPage } = props
  const { t } = useTranslation()

  return (
    <div css={modalWrapperStyle}>
      <div css={modalHeaderWrapper}>
        <span css={titleStyle}>
          {isParentPage
            ? t("widget.page.label.rename_page_url")
            : t("editor.page.label_name.edit_view")}
        </span>
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
            w="160px"
            value={path}
            colorScheme="techPurple"
            onChange={handleUpdateItem}
          />
        </SetterPadding>
      </LeftAndRightLayout>
    </div>
  )
}
