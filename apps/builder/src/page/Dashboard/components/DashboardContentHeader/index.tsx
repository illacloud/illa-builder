import { Avatar } from "@illa-public/avatar"
import { USER_ROLE, getCurrentTeamInfo } from "@illa-public/user-data"
import { canManageInvite } from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, PlusIcon } from "@illa-design/react"
import { DashboardContentHeaderProps } from "./interface"
import {
  dashboardContentHeaderContainerStyle,
  menuContainerStyle,
  nameStyle,
} from "./style"

export const DashboardContentHeader: FC<DashboardContentHeaderProps> = (
  props,
) => {
  const { icon, name, onCreate, onInvite, isCreateLoading, canCreate } = props

  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)!!
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const showInvite = canManageInvite(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  return (
    <div css={dashboardContentHeaderContainerStyle}>
      <Avatar avatarUrl={icon} size={40} />
      <div css={nameStyle}>{name}</div>
      <div
        style={{
          flexGrow: 1,
        }}
      />
      <div css={menuContainerStyle}>
        {showInvite ? (
          <Button
            w="200px"
            colorScheme="grayBlue"
            onClick={() => {
              onInvite()
            }}
          >
            {t("user_management.page.invite")}
          </Button>
        ) : null}
        {canCreate ? (
          <Button
            ml="8px"
            w="200px"
            colorScheme="techPurple"
            leftIcon={<PlusIcon size="10px" />}
            loading={isCreateLoading}
            onClick={onCreate}
          >
            {t("create_new")}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
