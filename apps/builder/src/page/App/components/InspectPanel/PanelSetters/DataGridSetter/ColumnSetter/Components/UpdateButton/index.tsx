import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RefreshIcon, Trigger } from "@illa-design/react"
import { UpdateButtonProps } from "./interface"
import {
  basicUpdateButtonContainerStyle,
  updateButtonContainerStyle,
} from "./style"

export const UpdateButton: FC<UpdateButtonProps> = (props) => {
  const { onClick } = props
  const { t } = useTranslation()

  return (
    <Trigger
      content={t("editor.inspect.setter_tips.grid_list.update")}
      position="top-start"
    >
      <button css={updateButtonContainerStyle} onClick={onClick}>
        <RefreshIcon size="16px" />
        {t("editor.inspect.setter_label.grid_list.update")}
      </button>
    </Trigger>
  )
}

export const BasicUpdateButton: FC<UpdateButtonProps> = (props) => {
  const { onClick } = props
  const { t } = useTranslation()

  return (
    <Trigger
      content={t("editor.inspect.setter_tips.grid_list.update")}
      position="top-start"
    >
      <button css={basicUpdateButtonContainerStyle} onClick={onClick}>
        <RefreshIcon size="16px" />
      </button>
    </Trigger>
  )
}
