import { FC } from "react"
import { Button } from "@illa-design/button"
import { AddIcon } from "@illa-design/icon"
import {
  HeaderLabelStyle,
  HeaderWrapperStyle,
} from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"

export interface HeaderProps {
  labelName: string
  addAction: () => void
  hasAddAction: boolean
}

export const Header: FC<HeaderProps> = props => {
  const { labelName, addAction, hasAddAction } = props
  return (
    <div css={HeaderWrapperStyle}>
      <span css={HeaderLabelStyle}>{labelName}</span>
      {hasAddAction && (
        <Button
          leftIcon={<AddIcon />}
          colorScheme="techPurple"
          variant="text"
          onClick={addAction}
        >
          New
        </Button>
      )}
    </div>
  )
}
