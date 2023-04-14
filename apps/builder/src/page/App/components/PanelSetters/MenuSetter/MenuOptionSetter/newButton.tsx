import { FC } from "react"
import { AddIcon, Button } from "@illa-design/react"
import { NewButtonProps } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/interface"
import { optionSubItemStyle } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/style"

export const NewButton: FC<NewButtonProps> = (props) => {
  const { title, ...otherProps } = props

  return (
    <Button
      pd={"1px 8px"}
      variant={"text"}
      colorScheme={"techPurple"}
      leftIcon={<AddIcon size={"14px"} />}
      {...otherProps}
    >
      {title}
    </Button>
  )
}

NewButton.displayName = "NewButton"
