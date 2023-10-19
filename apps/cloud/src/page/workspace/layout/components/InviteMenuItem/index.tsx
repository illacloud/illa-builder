import { MenuItem } from "@illa-public/cloud-dashboard-layout"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { showInviteModal } from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { ReactComponent as InviteIcon } from "@/assets/icon/workspace/invite.svg"
import { IInviteMenuItemProps } from "./interface"

export const InviteMenuItem: FC<IInviteMenuItemProps> = (props) => {
  const { onClickInvite } = props
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const { t } = useTranslation()
  return (
    currentTeamInfo &&
    showInviteModal(currentTeamInfo) && (
      <MenuItem
        labelName={t("user_management.page.invite")}
        labelKey="invite"
        icon={<InviteIcon />}
        onClickCallback={onClickInvite}
      />
    )
  )
}
