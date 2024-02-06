import {
  BuildActionInfo,
  CreateFromResourceModal,
  CreateFromTemplateModal,
  REPORT_PARAMETER,
  REPORT_TEMPLATE_STATUS,
  RESOURCE_TYPE,
  fetchBatchCreateAction,
} from "@illa-public/create-app"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { ComponentTreeNode, Resource } from "@illa-public/public-types"
import { getAuthToken, getILLABuilderURL } from "@illa-public/utils"
import { AnimatePresence } from "framer-motion"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { guideActions } from "@/redux/guide/guideSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchCreateApp, fetchForkApp } from "@/services/apps"
import { resourceContextHelper, track } from "@/utils/mixpanelHelper"
import { getCurrentTeamID } from "@/utils/team"
import CreateModal from "./CreateModal"

const GuideCreateApp: FC = () => {
  const message = useMessage()
  const teamID = useSelector(getCurrentTeamID)!
  const { teamIdentifier } = useParams()
  const resourceList = useSelector(getAllResources) || []
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [showCreateFromResourceModal, setShowCreateFromResourceModal] =
    useState(false)

  const [showCreateFromTemplateModal, setShowCreateFromTemplateModal] =
    useState(false)

  const closeGuideCreateAppModal = () => {
    dispatch(guideActions.updateGuideStatusReducer(false))
  }

  const forkApp = async (appID: string) => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
      {
        element: "create_app_modal_use_template",
        parameter1: REPORT_PARAMETER.BLANK_TUTORIAL_APP,
      },
    )
    try {
      const resp = await fetchForkApp(appID)
      window.open(
        `${getILLABuilderURL(window.customDomain)}/${teamIdentifier}/app/${
          resp.data.appId
        }?token=${getAuthToken()}`,
        "_blank",
      )
    } catch (e) {
      message.error({ content: t("create_fail") })
    } finally {
      closeGuideCreateAppModal()
    }
  }

  const handleUpdateResource = useCallback(
    (resource: Resource) => {
      dispatch(resourceActions.addResourceItemReducer(resource))
    },
    [dispatch],
  )

  const createFromResource = async (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => {
    try {
      const resp = await fetchCreateApp({
        appName: "Untitled app",
        initScheme: appInfo,
      })
      await fetchBatchCreateAction(teamID, resp.data.appId, actionsInfo)
      window.open(
        `${getILLABuilderURL(window.customDomain)}/${teamIdentifier}/app/${
          resp.data.appId
        }?token=${getAuthToken()}`,
        "_blank",
      )
    } catch (e) {
      message.error({ content: t("create_fail") })
    } finally {
      closeGuideCreateAppModal()
    }
  }

  return (
    <AnimatePresence>
      <CreateModal
        closeGuideCreateAppModal={closeGuideCreateAppModal}
        openCreateFromResourceModal={() => {
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
            {
              element: "create_app_modal_db",
              parameter1: REPORT_PARAMETER.BLANK_TUTORIAL_APP,
            },
          )
          setShowCreateFromResourceModal(true)
        }}
        openCreateFromTemplateModal={() => {
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
            {
              element: "create_app_modal",
              parameter1: REPORT_PARAMETER.CREATE_APP_MODAL,
            },
          )
          setShowCreateFromTemplateModal(true)
        }}
      />
      {showCreateFromResourceModal && (
        <MixpanelTrackProvider
          basicTrack={resourceContextHelper(
            REPORT_PARAMETER.TUTORIAL_APP_CREATE,
          )}
          pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL}
        >
          <CreateFromResourceModal
            updateResourceList={handleUpdateResource}
            resourceList={resourceList.filter((item) =>
              Object.values(RESOURCE_TYPE).includes(
                item?.resourceType as RESOURCE_TYPE,
              ),
            )}
            createCallBack={createFromResource}
            closeModal={() => setShowCreateFromResourceModal(false)}
          />
        </MixpanelTrackProvider>
      )}
      {showCreateFromTemplateModal && (
        <CreateFromTemplateModal
          hiddenCreateBlank
          handleForkApp={async (appID: string) => {
            track?.(
              ILLA_MIXPANEL_EVENT_TYPE.CLICK,
              ILLA_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
              {
                element: "create_app_modal_use_template",
                parameter1: REPORT_PARAMETER.CREATE_APP_MODAL,
                parameter2: REPORT_TEMPLATE_STATUS.IS_MODAL_TEMPLATE,
                parameter5: appID,
              },
            )
            await forkApp(appID)
          }}
          closeModal={() => setShowCreateFromTemplateModal(false)}
        />
      )}
    </AnimatePresence>
  )
}

export default GuideCreateApp
