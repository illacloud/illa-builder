import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { createAction, createResource } from "@/api/actions"
import { createApp } from "@/api/apps"
import { Api, BuilderApi } from "@/api/base"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { getTemplateAppConfig, getTemplateConfig } from "@/config/template"
import { TemplateListProps } from "@/page/Dashboard/Tutorial/TemplateList/interface"
import {
  descStyle,
  forkIconStyle,
  forkItemStyle,
  iconStyle,
  itemStyle,
  templateStyle,
  titleStyle,
} from "@/page/Dashboard/Tutorial/TemplateList/style"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export const TemplateList: FC<TemplateListProps> = (props) => {
  const { data } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const list = [
    {
      name: "Table",
      desc: "A template designed to show off visualization capabilities",
      icon: "",
    },
  ]

  return (
    <div css={templateStyle}>
      {data.map((item) => {
        return (
          <div css={itemStyle}>
            <div css={iconStyle} />
            <div>
              <div css={titleStyle}>{item.name}</div>
              <div css={descStyle}>{item.desc}</div>
            </div>
            <div
              css={forkItemStyle}
              onClick={async () => {
                const { name } = item
                const { appConfig, actions, resources } =
                  getTemplateConfig(name)
                const resourceList = await Promise.all(
                  resources.map((data, index) => {
                    return createResource(data)
                  }),
                )
                const appId = await createApp(name, appConfig)
                const actionList = await Promise.all(
                  actions.map((data, index) => {
                    return createAction(appId, {
                      ...data,
                      resourceId: resourceList[data.resourceId] || "",
                    })
                  }),
                )
                navigate(`/${teamIdentifier}/app/${appId}`)
              }}
            >
              <ForkIcon css={forkIconStyle} />
              Fork
            </div>
          </div>
        )
      })}
    </div>
  )
}

TemplateList.displayName = "TemplateList"
