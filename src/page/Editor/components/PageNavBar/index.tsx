import { FC, HTMLAttributes } from "react"
import { Button, ButtonGroup } from "@illa-design/button"
import { MoreIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { informationStyle, navBarStyle, projectInfoStyle } from "./style"
import { BugIcon, IllaLogoIcon } from "@/assets/icon"

interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t, i18n } = useTranslation()

  const projectInfo = {
    name: "Sample App",
    description: "Add description",
  }

  return (
    <div className={className} css={navBarStyle}>
      <div css={projectInfoStyle}>
        <IllaLogoIcon />
        <section css={informationStyle}>
          <div>{projectInfo.name}</div>
          <div>{projectInfo.description}</div>
        </section>
      </div>
      <div>logo</div>
      <div>
        <ButtonGroup spacing={"8px"}>
          <Button colorScheme={"gray"} size={"medium"} leftIcon={<BugIcon />}>
          </Button>
          <Button colorScheme={"gray"} size={"medium"}>
            <MoreIcon />
          </Button>
          <Button colorScheme={"techPurple"} size={"medium"}>
            {t("deploy")}
          </Button>
          <Button
            colorScheme={"techPurple"}
            size={"medium"}
            onClick={() => {
              i18n.changeLanguage("zh")
            }}
          >
            changeLanguage
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
