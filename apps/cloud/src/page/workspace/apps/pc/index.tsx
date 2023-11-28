import { PCAppCard, TeamContentEmpty } from "@illa-public/dashboard"
import { AppListContextProvider } from "@illa-public/dashboard"
import { BASIC_APP_CONFIG } from "@illa-public/public-configs"
import { AppInfoShape, USER_ROLE } from "@illa-public/public-types"
import {
  getCurrentId,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canAccess,
  canManage,
} from "@illa-public/user-role-utils"
import {
  getAuthToken,
  getILLABuilderURL,
  sendTagEvent,
} from "@illa-public/utils"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { mutate } from "swr"
import {
  Button,
  Divider,
  PlusIcon,
  Search,
  useMessage,
} from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { DashboardHeader } from "@/page/workspace/components/Header"
import { useSearch } from "@/page/workspace/hooks"
import {
  fetchCopyApp,
  fetchCreateApp,
  fetchDeleteApp,
  fetchUpdateAppConfig,
  useAppList,
} from "@/services/swr/app"
import { useDividerLine } from "../../layout/hook"
import { appContainerStyle, cardContainerStyle } from "./style"
import { generateDuplicateAppName } from "./utils"

export const PCAppWorkspace = () => {
  const currentTeamID = useSelector(getCurrentId)!
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const userInfo = useSelector(getCurrentUser)

  const canAccessApps = canAccess(
    currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(currentTeamInfo),
    ACTION_ACCESS.VIEW,
  )
  const { data: appList, isLoading } = useAppList(canAccessApps)
  const { t } = useTranslation()
  const [createLoading, setCreateLoading] = useState(false)
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const [appListResult, handleChangeSearch] = useSearch(appList ?? [], [
    "appName",
    "config.description",
  ])

  const [dividerShown, onContainerScroll] = useDividerLine()

  const refreshAppList = () => {
    mutate(["/apps", currentTeamID])
  }

  const deleteApp = (appID: string) => {
    const options = {
      optimisticData: (appList?: AppInfoShape[]) =>
        appList?.filter((item) => item.appId !== appID) ?? [],
      rollbackOnError(error: unknown) {
        if (error instanceof Error) {
          return error.name !== "AbortError"
        }
        return true
      },
    }
    return mutate(
      ["/apps", currentTeamID, canAccessApps],
      async (appList) => {
        const response = await fetchDeleteApp(appID, currentTeamID)
        if (Array.isArray(appList))
          return appList.filter((item) => item.appId !== response.data.appID)
        return appList
      },
      options,
    )
  }

  const copyApp = (appID: string) => {
    return mutate(["/apps", currentTeamID, canAccessApps], async () => {
      if (Array.isArray(appListResult)) {
        const targetAppInfo = appListResult?.find(
          (item) => item.appId === appID,
        )
        if (!targetAppInfo) return
        const newAppName = generateDuplicateAppName(targetAppInfo.appName)
        const response = await fetchCopyApp(appID, newAppName, currentTeamID)
        window.open(
          `${getILLABuilderURL()}/${teamIdentifier}/app/${
            response.appId
          }?token=${getAuthToken()}`,
          "_blank",
        )
        return [response, ...appListResult]
      }
      return appListResult
    })
  }

  const updateAppConfig = (
    appID: string,
    config: {
      public?: boolean
      waterMark?: boolean
      description?: string
      appName?: string
    },
  ) => {
    const options = {
      optimisticData: (appList?: AppInfoShape[]) => {
        const targetAppInfo = appList?.find((item) => item.appId === appID)
        if (!targetAppInfo) return appList ?? []
        const newAppList = appList?.filter((item) => item.appId !== appID) ?? []
        return [
          {
            ...targetAppInfo,
            appName: config.appName ?? targetAppInfo.appName,
            config: {
              ...targetAppInfo.config,
              ...config,
            },
          },
          ...newAppList,
        ]
      },
      rollbackOnError(error: unknown) {
        if (error instanceof Error) {
          return error.name !== "AbortError"
        }
        return true
      },
      populateCache: (
        updatedResult: AppInfoShape,
        appList?: AppInfoShape[],
      ) => {
        const filteredAppList =
          appList?.filter((item) => item.appId !== appID) ?? []
        return [updatedResult, ...filteredAppList]
      },
      revalidate: false,
    }
    return mutate(
      ["/apps", currentTeamID, canAccessApps],
      fetchUpdateAppConfig(appID, currentTeamID, config),
      options,
    )
  }

  const handleClickCreateApp = async () => {
    setCreateLoading(true)
    try {
      const resp = await fetchCreateApp(
        {
          appName: "Untitled app",
          initScheme: BASIC_APP_CONFIG,
        },
        currentTeamID,
      )
      sendTagEvent("create_app", userInfo?.userID)
      refreshAppList()
      window.open(
        `${getILLABuilderURL()}/${teamIdentifier}/app/${
          resp.data.appId
        }?token=${getAuthToken()}`,
        "_blank",
      )
    } catch (e) {
      message.error({ content: t("create_fail") })
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <div css={appContainerStyle}>
      <DashboardHeader
        titleName={t("page.workspace.menu.apps")}
        actionGroupComponent={
          <>
            <Search
              w="200px"
              size="large"
              colorScheme="techPurple"
              onChange={handleChangeSearch}
              placeholder={t("dashboard.search")}
              allowClear
            />
            {canManage(
              currentTeamInfo?.myRole ?? USER_ROLE.GUEST,
              ATTRIBUTE_GROUP.APP,
              getPlanUtils(currentTeamInfo),
              ACTION_MANAGE.CREATE_APP,
            ) && (
              <Button
                size="large"
                colorScheme="techPurple"
                leftIcon={<PlusIcon />}
                w="200px"
                loading={createLoading}
                onClick={handleClickCreateApp}
              >
                {t("new_dashboard.button.blank")}
              </Button>
            )}
          </>
        }
      />
      {isLoading ? (
        <FullSectionLoading />
      ) : appListResult.length > 0 ? (
        <AppListContextProvider
          deleteApp={deleteApp}
          copyApp={copyApp}
          updateAppConfig={updateAppConfig}
        >
          {dividerShown && <Divider direction="horizontal" />}

          <div css={cardContainerStyle} onScroll={onContainerScroll}>
            {appListResult.map((appInfo) => (
              <PCAppCard appInfo={appInfo} key={appInfo.appId} />
            ))}
          </div>
        </AppListContextProvider>
      ) : (
        <TeamContentEmpty
          loading={createLoading}
          onClickButton={handleClickCreateApp}
          showCreate={canManage(
            currentTeamInfo?.myRole ?? USER_ROLE.GUEST,
            ATTRIBUTE_GROUP.APP,
            getPlanUtils(currentTeamInfo),
            ACTION_MANAGE.CREATE_APP,
          )}
        />
      )}
    </div>
  )
}
