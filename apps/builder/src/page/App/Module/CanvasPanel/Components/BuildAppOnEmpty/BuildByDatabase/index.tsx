import {
  BuildActionInfo,
  CreateFromResourceModal,
  REPORT_PARAMETER,
  RESOURCE_TYPE,
  fetchBatchCreateAction,
} from "@illa-public/create-app"
import { getIconFromWidgetType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { ComponentTreeNode, Resource } from "@illa-public/public-types"
import { AnimatePresence } from "framer-motion"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, getColor } from "@illa-design/react"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { resourceContextHelper } from "@/utils/mixpanelHelper"
import { getCurrentTeamID } from "@/utils/team"
import { containerStyle, paddingStyle, textContentStyle } from "./style"

const BuildByDatabase: FC = () => {
  const formIcon = getIconFromWidgetType("FORM_WIDGET", "24px")
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const teamID = useSelector(getCurrentTeamID)!
  const appID = useSelector(getAppId)!
  const resourceList = useSelector(getAllResources) || []
  const [showCreateFromResourceModal, setShowCreateFromResourceModal] =
    useState(false)

  const { track } = useContext(MixpanelTrackContext)

  const createFromResourceCallback = async (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(
          componentsActions.deleteComponentNodeReducer({
            displayNames: ["page1"],
          }),
        )
        dispatch(componentsActions.addComponentReducer(appInfo.childrenNode))
        const actions = await fetchBatchCreateAction(teamID, appID, actionsInfo)
        DisplayNameGenerator.updateDisplayNameList(appInfo, actions)
        dispatch(actionActions.batchAddActionItemReducer(actions))
        resolve(undefined)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleUpdateResource = useCallback(
    (resource: Resource) => {
      dispatch(resourceActions.addResourceItemReducer(resource))
    },
    [dispatch],
  )

  const handleClickFromResource = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "create_app_modal_db",
        parameter1: REPORT_PARAMETER.BLANK_APP,
      },
      "both",
    )
    setShowCreateFromResourceModal(true)
  }

  return (
    <>
      <div css={paddingStyle}>
        <div css={containerStyle}>
          <div css={textContentStyle}>
            {formIcon}
            <span>{t("new_dashboard.create_new.generate_crud_app_fr")}</span>
          </div>
          <Button
            fullWidth
            onClick={handleClickFromResource}
            colorScheme={getColor("grayBlue", "02")}
          >
            {t("new_dashboard.create_from_resource.input_type_option.create")}
          </Button>
        </div>
      </div>
      <MixpanelTrackProvider
        basicTrack={resourceContextHelper(REPORT_PARAMETER.BLANK_APP_CREATE)}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
      >
        <AnimatePresence>
          {showCreateFromResourceModal && (
            <CreateFromResourceModal
              updateResourceList={handleUpdateResource}
              resourceList={resourceList.filter((item) =>
                Object.values(RESOURCE_TYPE).includes(
                  item?.resourceType as RESOURCE_TYPE,
                ),
              )}
              createCallBack={createFromResourceCallback}
              closeModal={() => setShowCreateFromResourceModal(false)}
            />
          )}
        </AnimatePresence>
      </MixpanelTrackProvider>
    </>
  )
}
export default BuildByDatabase
