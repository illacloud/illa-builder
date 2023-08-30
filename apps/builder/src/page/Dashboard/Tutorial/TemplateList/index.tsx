import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { ForkIcon, Image, useMessage } from "@illa-design/react"
import { forkTemplateApp } from "@/api/actions"
import { TemplateName } from "@/config/template/interface"
import { TemplateListProps } from "@/page/Dashboard/Tutorial/TemplateList/interface"
import { track } from "@/utils/mixpanelHelper"
import {
  contentStyle,
  descStyle,
  forkIconStyle,
  forkItemStyle,
  itemStyle,
  templateStyle,
  titleStyle,
} from "./style"

export const TemplateList: FC<TemplateListProps> = (props) => {
  const { data, loading, setLoading } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const handleForkApp = async (templateType: TemplateName, appName: string) => {
    if (loading) return
    setLoading(true)
    try {
      const appId = await forkTemplateApp(templateType, appName)
      navigate(`/${teamIdentifier}/app/${appId}`)
    } catch (e: any) {
      if (e?.response?.data?.errorMessage) {
        message.error({
          content: e?.response?.data?.errorMessage,
        })
      }
      if (
        e?.response == undefined &&
        e?.request != undefined &&
        e.request.status !== 401
      ) {
        message.warning({
          content: t("network_error"),
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (data) {
      data.forEach(() => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
          { element: "tutorial_template" },
        )
      })
    }
  }, [data])

  return (
    <div css={templateStyle}>
      {data.map((item) => {
        return (
          <div
            key={item.type}
            css={itemStyle}
            onClick={() => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
                { parameter5: item.nameKey, element: "tutorial_template" },
              )
              navigate(`/${teamIdentifier}/template/${item.type}`)
            }}
          >
            <Image width={40} height={40} bdRadius="4px" src={item.icon} />
            <div css={contentStyle}>
              <div css={titleStyle}>{t(`${item.nameKey}`)}</div>
              <div css={descStyle}>{t(`${item.descKey}`)}</div>
            </div>
            <div
              css={forkItemStyle}
              onClick={async (e) => {
                e.stopPropagation()
                await handleForkApp(item.type, t(`${item.nameKey}`))
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
                  {
                    parameter5: item.nameKey,
                    element: "tutorial_template_fork",
                  },
                )
              }}
            >
              <ForkIcon css={forkIconStyle} />
              {t("editor.tutorial.panel.tutorial.templates_action.fork")}
            </div>
          </div>
        )
      })}
    </div>
  )
}

TemplateList.displayName = "TemplateList"
