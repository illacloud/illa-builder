import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Divider, Empty, useMessage } from "@illa-design/react"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

const Tutorial: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  if (teamInfo && !canEditApp) {
    throw Error(`can not access tutorial view`)
  }

  return (
    <div>
      <Divider direction="horizontal" />
      <Empty paddingVertical="120px" />
    </div>
  )
}

export default Tutorial

Tutorial.displayName = "Tutorial"
