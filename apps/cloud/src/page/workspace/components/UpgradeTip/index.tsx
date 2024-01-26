import { UpgradeIcon } from "@illa-public/icon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import {
  customUpgradeIconStyle,
  linkStyle,
  tipsTextStyle,
  upgradeTipContainerStyle,
} from "./style"
import CustomUpgradeIcon from "./upgradeIcon.svg?react"

interface UpgradeTipProps {
  openToCloudModal: () => void
}

export const UpgradeTip: FC<UpgradeTipProps> = ({ openToCloudModal }) => {
  const { t } = useTranslation()
  return (
    <div css={upgradeTipContainerStyle}>
      <p css={tipsTextStyle}>{t("billing.homepage.get_access_to_advanc")}</p>
      <CustomUpgradeIcon css={customUpgradeIconStyle} />
      <div onClick={openToCloudModal} css={linkStyle}>
        <Button colorScheme="techPurple" leftIcon={<UpgradeIcon />} fullWidth>
          {t("billing.homepage.upgrade")}
        </Button>
      </div>
    </div>
  )
}
