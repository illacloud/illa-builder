import { getDocLink } from "@illa-public/public-configs"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button, DocsIcon } from "@illa-design/react"
import { WhiteList } from "../whiteList"
import { TipPanelProps } from "./interface"
import { linkContainerStyle, tipsPanelContainerStyle } from "./style"

export const TipPanel: FC<TipPanelProps> = (props) => {
  const { resourceType } = props
  const docLink = getDocLink("action", resourceType)
  const { t } = useTranslation()
  return (
    <div css={tipsPanelContainerStyle}>
      {docLink && (
        <Link to={docLink} css={linkContainerStyle} target="_blank">
          <Button leftIcon={<DocsIcon />} colorScheme="grayBlue" w="100%">
            {t("editor.inspect.header.action_menu.view_documentation")}
          </Button>
        </Link>
      )}
      {isCloudVersion && <WhiteList />}
    </div>
  )
}
