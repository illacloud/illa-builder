import { getIconFromResourceType } from "@illa-public/icon"
import { getResourceNameFromResourceType } from "@illa-public/resource-generator"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, PreviousIcon } from "@illa-design/react"
import { CreateButton } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ActionButtons/CreateButton"
import { TestConnectButton } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ActionButtons/TestConnectButton"
import { ResourceHeaderProps } from "./interface"
import {
  buttonContainerStyle,
  headerContainerStyle,
  headerOuterContainerStyle,
  titleContainerStyle,
  titleNameContainerStyle,
  titleNameStyle,
} from "./style"

export const Header: FC<ResourceHeaderProps> = (props) => {
  const { t } = useTranslation()
  const { resourceType, onClickBack } = props

  return (
    <div css={headerOuterContainerStyle}>
      <div css={headerContainerStyle}>
        <div>
          <Button
            leftIcon={<PreviousIcon />}
            variant="text"
            colorScheme="gray"
            type="button"
            onClick={onClickBack}
          >
            {t("back")}
          </Button>
        </div>
        <div css={titleContainerStyle}>
          <div css={titleNameContainerStyle}>
            {getIconFromResourceType(resourceType, "24px")}
            <h1 css={titleNameStyle}>
              {getResourceNameFromResourceType(resourceType)}
            </h1>
          </div>
          <div css={buttonContainerStyle}>
            <TestConnectButton resourceType={resourceType} />
            <CreateButton />
          </div>
        </div>
      </div>
    </div>
  )
}
