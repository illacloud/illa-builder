import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, useMessage } from "@illa-design/react"
import { forkTemplateApp } from "@/api/actions"
import { BuilderApi } from "@/api/base"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { getTemplateConfig } from "@/config/template"
import { TemplateName } from "@/config/template/interface"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import {
  informationStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
  viewControlStyle,
} from "@/page/App/components/PageNavBar/style"
import { editorContainerStyle } from "@/page/App/style"
import { forkIconStyle, forkTextStyle, frameStyle } from "@/page/Template/style"
import { Page404 } from "@/page/status/404"
import { configActions } from "@/redux/config/configSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { track } from "@/utils/mixpanelHelper"

const Template: FC = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { t } = useTranslation()
  const { templateName, teamIdentifier } = useParams()
  const { example, nameKey } = getTemplateConfig(templateName as TemplateName)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleForkApp = async () => {
    if (loading) return
    setLoading(true)
    try {
      const appId = await forkTemplateApp(
        templateName as TemplateName,
        t(`${nameKey}`),
      )
      navigate(`/${teamIdentifier}/app/${appId}`)
    } catch (e: any) {
      if (e?.response?.data?.errorMessage) {
        message.error({
          content: e?.response?.data?.errorMessage,
        })
      }
      if (e?.response == undefined && e?.request != undefined) {
        message.warning({
          content: t("network_error"),
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    // initTemplate
    const controller = new AbortController()
    dispatch(configActions.updateIllaMode("preview"))
    BuilderApi.teamRequest<Resource<ResourceContent>[]>(
      {
        url: "/resources",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(resourceActions.updateResourceListReducer(response.data))
      },
    )
    return () => {
      controller.abort()
    }
  }, [])

  if (!example || !templateName) return <Page404 />

  return (
    <div css={editorContainerStyle}>
      <div css={navBarStyle}>
        <div css={rowCenter}>
          <Logo
            width="34px"
            onClick={() => {
              window.location.href = `/${teamIdentifier}/dashboard/tutorial`
            }}
            css={logoCursorStyle}
          />
          <div css={informationStyle}>
            <div css={nameStyle}>{t(`${nameKey}`)}</div>
          </div>
        </div>
        <div css={viewControlStyle}>
          <span css={forkTextStyle}>
            {t(
              "editor.tutorial.panel.tutorial.templates_action.fork_description",
            )}
          </span>
          <Button
            loading={loading}
            colorScheme="techPurple"
            leftIcon={<ForkIcon css={forkIconStyle} />}
            onClick={() => {
              handleForkApp()
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.BUILDER_TUTORIAL_PREVIEW,
                { element: "tutorial_template_fork", parameter5: nameKey },
              )
            }}
          >
            {t("editor.tutorial.panel.tutorial.templates_action.fork")}
          </Button>
        </div>
        <div />
      </div>
      <iframe css={frameStyle} src={example} />
    </div>
  )
}

export default Template

Template.displayName = "Template"
