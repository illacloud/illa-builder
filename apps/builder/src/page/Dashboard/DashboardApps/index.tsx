import copy from "copy-to-clipboard"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Divider,
  Empty,
  List,
  ListItem,
  ListItemMeta,
  useMessage,
} from "@illa-design/react"
import { CreateNewModal } from "@/page/Dashboard/components/CreateNewModal"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { fromNow } from "@/utils/dayjs"
import {
  appsContainerStyle,
  hoverStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "./style"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)
  const [createNewModalVisible, setCreateNewModalVisible] = useState(false)

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("dashboard.app.all_apps")}</span>
          <Button
            colorScheme="gray"
            onClick={() => {
              copy(window.location.href)
              message.success({ content: t("link_copied") })
            }}
          >
            {t("share")}
          </Button>
          <Button
            ml="4px"
            colorScheme="techPurple"
            onClick={() => {
              setCreateNewModalVisible(true)
            }}
          >
            {t("create_new_app")}
          </Button>
        </div>
        <Divider direction="horizontal" />
        {appsList.length !== 0 && (
          <List
            h={"100%"}
            ov={"auto"}
            data={appsList}
            bordered={false}
            hoverable={true}
            render={(item) => {
              return (
                <ListItem
                  css={hoverStyle}
                  extra={<DashboardItemMenu appId={item.appId} />}
                >
                  <ListItemMeta
                    onClick={() => {
                      navigate(`/${teamIdentifier}/app/${item.appId}`)
                    }}
                    title={item.appName}
                    description={t("dashboard.app.edited_time", {
                      time: fromNow(item.updatedAt),
                      user: item.appActivity.modifier,
                    })}
                  />
                </ListItem>
              )
            }}
            renderKey={(item) => {
              return item.appId
            }}
          />
        )}
        {appsList.length == 0 && <Empty paddingVertical="120px" />}
      </div>
      <CreateNewModal
        onCreateSuccess={() => {
          setCreateNewModalVisible(false)
        }}
        visible={createNewModalVisible}
        onVisibleChange={(visible) => {
          setCreateNewModalVisible(visible)
        }}
      />
    </>
  )
}

DashboardApps.displayName = "DashboardApps"
