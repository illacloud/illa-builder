import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { forkTemplateApp } from "@/api/actions"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { TemplateName } from "@/config/template/interface"
import { TemplateListProps } from "@/page/Dashboard/Tutorial/TemplateList/interface"
import {
  contentStyle,
  descStyle,
  forkIconStyle,
  forkItemStyle,
  iconStyle,
  itemStyle,
  templateStyle,
  titleStyle,
} from "@/page/Dashboard/Tutorial/TemplateList/style"

export const TemplateList: FC<TemplateListProps> = (props) => {
  const { data } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const [loading, setLoading] = useState(false)

  const handleForkApp = async (templateName: string) => {
    if (loading) return
    setLoading(true)
    try {
      const appId = await forkTemplateApp(templateName as TemplateName)
      navigate(`/${teamIdentifier}/app/${appId}`)
    } catch (e) {}
    setLoading(false)
  }

  return (
    <div css={templateStyle}>
      {data.map((item) => {
        return (
          <div
            key={item.type}
            css={itemStyle}
            onClick={() => {
              navigate(`/${teamIdentifier}/template/${item.type}`)
            }}
          >
            <div css={iconStyle} />
            <div css={contentStyle}>
              <div css={titleStyle}>{item.name}</div>
              <div css={descStyle}>{item.desc}</div>
            </div>
            <div
              css={forkItemStyle}
              onClick={async (e) => {
                e.stopPropagation()
                handleForkApp(item.type)
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
