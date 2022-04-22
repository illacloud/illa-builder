import { FC, HTMLAttributes } from "react"
import { Button, ButtonGroup } from "@illa-design/button"
import { MoreIcon } from "@illa-design/icon"
import { NavBarStyle } from "./style"

interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props

  return (
    <div className={className} css={NavBarStyle}>
      <ButtonGroup spacing={"8px"}>
        <Button colorScheme={"gray"} leftIcon={<MoreIcon />}></Button>
        <Button colorScheme={"purple"}>deploy</Button>
      </ButtonGroup>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
