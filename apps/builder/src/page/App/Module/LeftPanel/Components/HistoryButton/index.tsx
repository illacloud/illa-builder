import IconHotSpot from "@illa-public/icon-hot-spot"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { t } from "i18next"
import { FC, memo } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { HistoryIcon, Trigger, getColor } from "@illa-design/react"

const HistoryButton: FC = () => {
  const { teamIdentifier, appId } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)

  const navigate = useNavigate()
  const upgradeModal = useUpgradeModal()

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleOpenHistory = () => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
        from: "app_edit_more_history",
      })
    } else {
      navigate(`/${teamIdentifier}/appHistory/${appId}`)
    }
  }

  return (
    <Trigger
      position="right"
      content={t("flow.editor.app.tooltips.edit_history")}
    >
      <IconHotSpot onClick={handleOpenHistory}>
        <HistoryIcon color={getColor("grayBlue", "02")} />
      </IconHotSpot>
    </Trigger>
  )
}

export default memo(HistoryButton)
