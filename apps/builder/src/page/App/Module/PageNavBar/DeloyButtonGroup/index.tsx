import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  DownIcon,
  DropList,
  DropListItem,
  Dropdown,
  PlayFillIcon,
} from "@illa-design/react"
import { UpgradeTag } from "@/components/UpgradeTag"
import {
  deployButtonStyle,
  deployConfigButtonStyle,
  deployConfigDescStyle,
  deployLabelStyle,
  deployMenuStyle,
  deployMenuWithTagStyle,
} from "@/page/App/Module/PageNavBar/DeloyButtonGroup/style"

export interface DeployButtonGroupProps {
  onClickDeploy: () => void
  onClickDeployMenu: (value: string | number) => void
  loading: boolean
  isGuideMode: boolean
  canUseBillingFeature: boolean
  disPrivate: boolean
  isPublic?: boolean
}

export const DeployButtonGroup: FC<DeployButtonGroupProps> = (props) => {
  const { t } = useTranslation()
  const {
    loading,
    isPublic,
    isGuideMode,
    canUseBillingFeature,
    onClickDeploy,
    disPrivate,
    onClickDeployMenu,
  } = props

  if (!isCloudVersion || isGuideMode) {
    return (
      <Button
        loading={loading}
        colorScheme="techPurple"
        size="medium"
        leftIcon={<PlayFillIcon />}
        onClick={onClickDeploy}
      >
        {isGuideMode
          ? t("editor.tutorial.panel.tutorial.modal.fork")
          : t("deploy")}
      </Button>
    )
  }

  return (
    <div css={deployButtonStyle}>
      <Button
        loading={loading}
        colorScheme="techPurple"
        size="medium"
        bdRadius="8px 0 0 8px"
        leftIcon={<PlayFillIcon />}
        onClick={onClickDeploy}
      >
        {isPublic ? t("new_deploy.button.public") : t("deploy")}
      </Button>
      <Dropdown
        position="bottom-end"
        trigger="click"
        triggerProps={{ closeDelay: 0, openDelay: 0 }}
        dropList={
          <DropList onClickItem={onClickDeployMenu}>
            <DropListItem
              key="private"
              value="private"
              disabled={disPrivate}
              title={
                <div css={deployMenuStyle}>
                  <div css={deployLabelStyle}>
                    {t("new_deploy.title.private_app")}
                  </div>
                  <div css={deployConfigDescStyle}>
                    {t("new_deploy.desc.private_app")}
                  </div>
                </div>
              }
            />
            <DropListItem
              key="public"
              value="public"
              title={
                <div css={deployMenuStyle}>
                  {canUseBillingFeature ? (
                    <div css={deployLabelStyle}>
                      {t("new_deploy.title.public_app")}
                    </div>
                  ) : (
                    <div css={deployMenuWithTagStyle}>
                      <span css={deployLabelStyle}>
                        {t("new_deploy.title.public_app")}
                      </span>
                      <UpgradeTag />
                    </div>
                  )}
                  <div css={deployConfigDescStyle}>
                    {t("new_deploy.desc.public_app")}
                  </div>
                </div>
              }
            />
          </DropList>
        }
      >
        <Button
          css={deployConfigButtonStyle}
          colorScheme="techPurple"
          bdRadius="0 8px 8px 0"
          leftIcon={<DownIcon />}
        />
      </Dropdown>
    </div>
  )
}
