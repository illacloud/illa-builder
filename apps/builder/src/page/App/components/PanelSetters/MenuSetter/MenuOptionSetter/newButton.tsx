import { FC } from "react"
import { AddIcon } from "@illa-design/react"
import { NewButtonProps } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import { optionSubItemStyle } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"

export const NewButton: FC<NewButtonProps> = (props) => {
  const { title, ...otherProps } = props

  return (
    <div css={optionSubItemStyle} {...otherProps}>
      <AddIcon mr="4px" viewBox="0 0 14 14" />
      {title}
    </div>
  )
}

NewButton.displayName = "NewButton"
