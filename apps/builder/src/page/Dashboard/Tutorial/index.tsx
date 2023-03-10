import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { NextIcon, useMessage } from "@illa-design/react"
import { ReactComponent as CardCover } from "@/assets/tutorial/card-cover.svg"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { appsContainerStyle } from "@/page/Dashboard/DashboardApps/style"
import { TemplateList } from "@/page/Dashboard/Tutorial/TemplateList"
import {
  cardBgStyle,
  cardDescStyle,
  cardFooterStyle,
  cardStyle,
  cardTitleStyle,
  titleStyle,
} from "@/page/Dashboard/Tutorial/style"
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
    <div css={appsContainerStyle}>
      <div css={titleStyle}>Tutorial</div>
      <div css={cardStyle}>
        <CardCover css={cardBgStyle} />
        <div css={cardTitleStyle}>{"Onboarding app"}</div>
        <div css={cardDescStyle}>
          {"Follow ILLA's tutorial to learn how to build an app in 5 minutes."}
        </div>
        <div css={cardFooterStyle}>
          Go <NextIcon />
        </div>
      </div>
      <div css={titleStyle}>Use Cases</div>
      <TemplateList />
    </div>
  )
}

export default Tutorial

Tutorial.displayName = "Tutorial"
