import { FC } from "react"
import { AddIcon, Link } from "@illa-design/react"
import { optionListHeaderStyle } from "./style"
import { HeaderProps } from "./interface"
import { useTranslation } from "react-i18next"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName, handleAddOption } = props
  const { t } = useTranslation()

  return (
    <div css={optionListHeaderStyle}>
      <div>{labelName}</div>
      <div css={headerActionButtonStyle} onClick={handleAddOption}>
        <AddIcon _css={addIconStyle} />
        <span>{t("editor.inspect.setter_content.option_list.new")}</span>
      </div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
