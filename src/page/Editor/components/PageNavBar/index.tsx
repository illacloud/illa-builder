import { FC, HTMLAttributes } from "react"
import { Button, ButtonGroup } from "@illa-design/button"
import { MoreIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { NavBarStyle } from "./style"
import { Select } from "@illa-design/select"

interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t, i18n } = useTranslation()

  return (
    <div className={className} css={NavBarStyle}>
      <ButtonGroup spacing={"8px"}>
        <Button colorScheme={"gray"} leftIcon={<MoreIcon />}></Button>
        <Button colorScheme={"purple"}>{t("deploy")}</Button>
        <Button
          colorScheme={"purple"}
          onClick={() => {
            i18n.changeLanguage("zh")
          }}
        >
          changeLanguage
        </Button>
      </ButtonGroup>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
