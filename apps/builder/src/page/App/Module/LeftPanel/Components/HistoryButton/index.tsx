import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { FC, memo } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { HistoryIcon, getColor } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"

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
    <IconHotSpot onClick={handleOpenHistory}>
      <HistoryIcon color={getColor("grayBlue", "02")} />
    </IconHotSpot>
  )
}

export default memo(HistoryButton)
