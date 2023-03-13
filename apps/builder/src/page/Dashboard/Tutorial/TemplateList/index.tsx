import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { getTemplateAppConfig } from "@/config/template"
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

  const createApp = (
    appName: string,
    initScheme: Record<string, unknown>[],
  ) => {
    BuilderApi.teamRequest<DashboardApp>(
      {
        url: "/apps",
        method: "POST",
        data: {
          appName,
          initScheme,
        },
      },
      (response) => {
        dispatch(
          dashboardAppActions.addDashboardAppReducer({
            app: response.data,
          }),
        )
        navigate(`/${teamIdentifier}/app/${response.data.appId}`)
      },
      (failure) => {},
      (error) => {},
      (loading) => {
        // setLoading(loading)
      },
      (errorState) => {
        if (errorState) {
          message.error({ content: t("create_fail") })
        }
      },
    )
  }

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
              onClick={() => {
                createApp(item.name, getTemplateAppConfig(item.name))
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
