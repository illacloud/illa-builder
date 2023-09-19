import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Link } from "@illa-design/react"
import { HeaderProps } from "./interface"
import { optionListHeaderStyle } from "./style"

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
