import { FC } from "react"
import { AddIcon } from "@illa-design/icon"
import {
  addIconStyle,
  optionListHeaderStyle,
  headerActionButtonStyle,
} from "./style"
import { HeaderProps } from "./interface"
import { useTranslation } from "react-i18next"
import { Link } from "@illa-design/link"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName, handleAddOption } = props
  const { t } = useTranslation()

  return (
    <div css={optionListHeaderStyle}>
      <div>{labelName}</div>
      <Link
        colorScheme="techPurple"
        icon={<AddIcon />}
        hoverable
        onClick={handleAddOption}
      >
        <span>{t("editor.inspect.setter_content.option_list.new")}</span>
      </Link>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
