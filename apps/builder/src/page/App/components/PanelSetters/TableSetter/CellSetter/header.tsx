import { FC } from "react"
import { useTranslation } from "react-i18next"
import { HeaderProps } from "./interface"
import { optionListHeaderStyle } from "./style"

export const OptionListHeader: FC<HeaderProps> = (props) => {
  const { labelName } = props
  const { t } = useTranslation()

  return (
    <div css={optionListHeaderStyle}>
      <div>{labelName}</div>
    </div>
  )
}

OptionListHeader.displayName = "OptionListHeader"
