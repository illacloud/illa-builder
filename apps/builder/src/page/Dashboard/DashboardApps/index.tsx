import { FC, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { cloneDeep } from "lodash"
// TODO: @aruseito Abstract into tool function
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import copy from "copy-to-clipboard"
import { Button } from "@illa-design/button"
import { List, ListItem, ListItemMeta } from "@illa-design/list"
import { MoreIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { Empty } from "@illa-design/empty"
import { Message } from "@illa-design/message"
import { Modal } from "@illa-design/modal"
import { Input } from "@illa-design/input"
import { Dropdown } from "@illa-design/dropdown"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { modalStyle } from "@/page/Dashboard/components/DashboardItemMenu/style"
import {
  appsContainerStyle,
  hoverableStyle,
  itemExtraContainerStyle,
  listItemStyle,
  listTitleContainerStyle,
  listTitleStyle,
  modalInputStyle,
} from "./style"

dayjs.extend(utc)
dayjs.extend(timezone)

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)

  // current appInfo
  const [currentAppIdx, setCurrentAppIdx] = useState<number>(0)
  // create new state
  const [createNewVisible, setCreateNewVisible] = useState<boolean>(false)
  const [createNewValue, setCreateNewValue] = useState<string>("")
  const [createLoading, setCreateNewLoading] = useState(false)
  // rename modal state
  const [renameModalVisible, setRenameModalVisible] = useState<boolean>(false)
  const [renameValue, setRenameValue] = useState<string>("")
  const [renameModalLoading, setRenameModalLoading] = useState<boolean>(false)
  // duplicate modal state
  const [duplicateModalVisible, setDuplicateModalVisible] =
    useState<boolean>(false)
  const [duplicateValue, setDuplicateValue] = useState<string>("")
  const [duplicateModalLoading, setDuplicateModalLoading] =
    useState<boolean>(false)

  const sortedAppsList = useMemo(() => {
    if (Array.isArray(appsList) && appsList.length > 0) {
      const tmpAppList = cloneDeep(appsList)
      return tmpAppList.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
    }
    return []
  }, [appsList])

  useEffect(() => {
    return () => {
      setCreateNewLoading(false)
      setRenameModalLoading(false)
      setDuplicateModalLoading(false)
    }
  }, [])

  // rename function
  const showRenameModal = () => {
    setRenameModalVisible(true)
  }
  const renameRequest = () => {
    Api.request(
      {
        url: `/apps/${sortedAppsList[currentAppIdx].appId}`,
        method: "PUT",
        data: {
          appName: renameValue,
        },
      },
      (response) => {
        dispatch(
          dashboardAppActions.renameDashboardAppReducer({
            appId: sortedAppsList[currentAppIdx].appId,
            newName: renameValue,
          }),
        )
      },
      (failure) => {
        Message.error(t("dashboard.app.rename_fail"))
      },
      (crash) => {
        Message.error(t("network_error"))
      },
      (loading) => {
        setRenameModalLoading(loading)
        if (!loading) {
          setRenameModalVisible(loading)
        }
      },
    )
  }

  // duplicate function
  const showDuplicateModal = () => {
    setDuplicateModalVisible(true)
  }
  const duplicateRequest = () => {
    Api.request<DashboardApp>(
      {
        url: `/apps/${sortedAppsList[currentAppIdx].appId}/duplication`,
        method: "POST",
        data: {
          appName: duplicateValue,
        },
      },
      (response) => {
        dispatch(
          dashboardAppActions.addDashboardAppReducer({
            app: response.data,
          }),
        )
      },
      (failure) => {
        Message.error(t("dashboard.app.duplicate_fail"))
      },
      (crash) => {
        Message.error(t("network_error"))
      },
      (loading) => {
        setDuplicateModalLoading(loading)
        if (!loading) {
          setDuplicateModalVisible(loading)
        }
      },
    )
  }

  // create new function
  const createNewRequest = () => {
    Api.request<DashboardApp>(
      {
        url: "/apps",
        method: "POST",
        data: {
          appName: createNewValue,
        },
      },
      (response) => {
        dispatch(
          dashboardAppActions.addDashboardAppReducer({
            app: response.data,
          }),
        )
        navigate(`/app/${response.data.appId}`)
      },
      (failure) => {},
      (error) => {},
      (loading) => {
        setCreateNewLoading(loading)
      },
      (errorState) => {
        if (errorState) {
          Message.error({ content: t("create_fail") })
        }
      },
    )
  }

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("dashboard.app.all_apps")}</span>
          <Button
            colorScheme="gray"
            onClick={() => {
              copy(`${location.protocol}//${location.host}/dashboard/apps`)
              Message.success({ content: t("link_copied") })
            }}
          >
            {t("share")}
          </Button>
          <Button
            ml="4px"
            colorScheme="techPurple"
            onClick={() => {
              setCreateNewVisible(true)
            }}
          >
            {t("create_new_app")}
          </Button>
        </div>
        <Divider direction="horizontal" />
        {sortedAppsList.length !== 0 && (
          <List
            size="medium"
            data={sortedAppsList}
            bordered={false}
            hoverable={true}
            renderRaw
            render={(item, index) => {
              return (
                <ListItem
                  css={listItemStyle}
                  extra={
                    <div css={itemExtraContainerStyle}>
                      <Button
                        className="editButton"
                        colorScheme="techPurple"
                        onClick={() => {
                          navigate(`/app/${item.appId}`)
                        }}
                        title="editButton"
                        opacity={0}
                      >
                        {t("edit")}
                      </Button>
                      <Dropdown
                        position="br"
                        trigger="click"
                        triggerProps={{ closeDelay: 0, openDelay: 0 }}
                        dropList={
                          <DashboardItemMenu
                            appId={item.appId}
                            appIndex={index}
                            showRenameModal={showRenameModal}
                            showDuplicateModal={showDuplicateModal}
                            setCurrentAppIdx={setCurrentAppIdx}
                          />
                        }
                      >
                        <Button
                          ml="4px"
                          colorScheme="grayBlue"
                          leftIcon={<MoreIcon size="14px" />}
                        />
                      </Dropdown>
                    </div>
                  }
                >
                  <ListItemMeta
                    css={hoverableStyle}
                    title={item.appName}
                    description={`${item?.appActivity.modifier} ${t(
                      "edit_at",
                    )} ${dayjs(item.updatedAt)
                      .tz(dayjs.tz.guess())
                      .format("YYYY-MM-DD HH:mm:ss")}`}
                    onClick={() => {
                      navigate(`/app/${item.appId}`)
                    }}
                  />
                </ListItem>
              )
            }}
            renderKey={(item) => {
              return item.appId
            }}
          />
        )}
        {sortedAppsList.length == 0 && <Empty paddingVertical="120px" />}
      </div>
      <Modal
        simple
        closable
        hideCancel
        autoFocus={false}
        footerAlign="right"
        css={modalStyle}
        okButtonProps={{
          colorScheme: "techPurple",
        }}
        visible={createNewVisible}
        confirmLoading={createLoading}
        onCancel={() => {
          setCreateNewVisible(false)
        }}
        onOk={() => {
          if (!createNewValue) {
            Message.error(t("dashboard.app.name_empty"))
            return
          }
          createNewRequest()
        }}
        title={t("dashboard.app.create_app")}
        okText={t("save")}
      >
        <Input
          css={modalInputStyle}
          borderColor="techPurple"
          onChange={(res) => {
            setCreateNewValue(res)
          }}
        />
      </Modal>
      {sortedAppsList.length !== 0 && (
        <Modal
          simple
          closable
          hideCancel
          autoFocus={false}
          footerAlign="right"
          visible={renameModalVisible}
          title={t("dashboard.app.rename_app")}
          css={modalStyle}
          okButtonProps={{
            colorScheme: "techPurple",
          }}
          confirmLoading={renameModalLoading}
          onCancel={() => {
            setRenameModalVisible(false)
          }}
          okText={t("save")}
          onOk={() => {
            if (!renameValue) {
              Message.error(t("dashboard.app.name_empty"))
              return
            }
            if (sortedAppsList.some((item) => item.appName === renameValue)) {
              Message.error(t("dashboard.app.name_existed"))
              return
            }
            renameRequest()
          }}
        >
          <Input
            css={modalInputStyle}
            borderColor="techPurple"
            placeholder={sortedAppsList[currentAppIdx].appName}
            onChange={(res) => {
              setRenameValue(res)
            }}
          />
        </Modal>
      )}
      {sortedAppsList.length !== 0 && (
        <Modal
          simple
          closable
          hideCancel
          autoFocus={false}
          footerAlign="right"
          visible={duplicateModalVisible}
          css={modalStyle}
          okButtonProps={{
            colorScheme: "techPurple",
          }}
          confirmLoading={duplicateModalLoading}
          onCancel={() => {
            setDuplicateModalVisible(false)
          }}
          onOk={() => {
            if (!duplicateValue) {
              Message.error(t("dashboard.app.name_empty"))
              return
            }
            if (
              sortedAppsList.some((item) => item.appName === duplicateValue)
            ) {
              Message.error(t("dashboard.app.name_existed"))
              return
            }
            duplicateRequest()
          }}
          title={`${t("duplicate")} "${sortedAppsList[currentAppIdx].appName}"`}
          okText={t("save")}
        >
          <Input
            css={modalInputStyle}
            borderColor="techPurple"
            onChange={(res) => {
              setDuplicateValue(res)
            }}
            placeholder={`${t("dashboard.app.duplicate_placeholder")}`}
          />
        </Modal>
      )}
    </>
  )
}

DashboardApps.displayName = "DashboardApps"
