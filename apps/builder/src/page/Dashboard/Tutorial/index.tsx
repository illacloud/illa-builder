import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useBeforeUnload, useNavigate, useParams } from "react-router-dom"
import { NextIcon, Spin } from "@illa-design/react"
import { ReactComponent as CardCover } from "@/assets/tutorial/card-cover.svg"
import { Templates } from "@/config/template"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import {
  appsContainerStyle,
  contentStyle,
} from "@/page/Dashboard/DashboardApps/style"
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
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

const Tutorial: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const [loading, setLoading] = useState(false)

  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const toGuideModeApp = () => {
    navigate(`/${teamIdentifier}/guide`)
  }

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL)
  })

  if (teamInfo && !canEditApp) {
    throw Error(`can not access tutorial view`)
  }

  return (
    <Spin css={appsContainerStyle} colorScheme="techPurple" loading={loading}>
      <div css={contentStyle}>
        <div>
          <div css={titleStyle}>
            {t("editor.tutorial.panel.tutorial.tab.title")}
          </div>
          <div
            css={cardStyle}
            onClick={() => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
                { element: "tutorial_onboarding_app" },
              )
              toGuideModeApp()
            }}
          >
            <CardCover css={cardBgStyle} />
            <div css={cardTitleStyle}>
              {t("editor.tutorial.panel.tutorial.onboarding_app.name")}
            </div>
            <div css={cardDescStyle}>
              {t("editor.tutorial.panel.tutorial.onboarding_app.description")}
            </div>
            <div css={cardFooterStyle}>
              {t("editor.tutorial.panel.tutorial.onboarding_app.action")}{" "}
              <NextIcon />
            </div>
          </div>
        </div>
        <div css={[titleStyle]}>
          {t("editor.tutorial.panel.tutorial.title.templates")}
        </div>
        <TemplateList
          data={Templates}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </Spin>
  )
}

export default Tutorial

Tutorial.displayName = "Tutorial"
