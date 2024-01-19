import {
  BuildActionInfo,
  CreateFromResourceModal,
  fetchBatchCreateAction,
} from "@illa-public/create-app"
import { getIconFromWidgetType } from "@illa-public/icon"
import { ComponentTreeNode, Resource } from "@illa-public/public-types"
import { AnimatePresence } from "framer-motion"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, getColor } from "@illa-design/react"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getCurrentTeamID } from "@/utils/team"
import { containerStyle, textContentStyle } from "./style"

const BuildByDatabase: FC = () => {
  const formIcon = getIconFromWidgetType("FORM_WIDGET", "24px")
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const teamID = useSelector(getCurrentTeamID)!
  const appID = useSelector(getAppId)!
  const resourceList = useSelector(getAllResources) || []
  const [showCreateFromResourceModal, setShowCreateFromResourceModal] =
    useState(false)

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
        dispatch(executionActions.startExecutionReducer())
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

  return (
    <>
      <div css={containerStyle}>
        <div css={textContentStyle}>
          {formIcon}
          <span>{t("new_dashboard.create_new.generate_crud_app_fr")}</span>
        </div>
        <Button
          onClick={() => setShowCreateFromResourceModal(true)}
          colorScheme={getColor("grayBlue", "02")}
        >
          {t("new_dashboard.create_from_resource.input_type_option.create")}
        </Button>
      </div>
      <AnimatePresence>
        {showCreateFromResourceModal && (
          <CreateFromResourceModal
            updateResourceList={handleUpdateResource}
            resourceList={resourceList}
            createCallBack={createFromResourceCallback}
            closeModal={() => setShowCreateFromResourceModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
export default BuildByDatabase
