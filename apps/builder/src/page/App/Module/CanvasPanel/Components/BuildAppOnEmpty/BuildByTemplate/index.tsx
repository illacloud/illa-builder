import {
  AppTemplateCard,
  CreateFromTemplateModal,
  REPORT_PARAMETER,
  fetchBatchCreateAction,
} from "@illa-public/create-app"
import { ProductMarketApp } from "@illa-public/market-app"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { AnimatePresence } from "framer-motion"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { NextIcon } from "@illa-design/react"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { fetchPubicAppInitData } from "@/services/apps"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getCurrentTeamID } from "@/utils/team"
import {
  containerStyle,
  moreContainerStyle,
  moreContentStyle,
  templateCardContainerStyle,
} from "./style"

interface BuildByTemplateProps {
  templateList: ProductMarketApp[]
  showCardCount: number
  showAnimation: boolean
  handleShowPreview: (src?: string) => void
}

const BuildByTemplate: FC<BuildByTemplateProps> = ({
  templateList,
  showCardCount,
  showAnimation,
  handleShowPreview,
}) => {
  const [showCreateFromTemplateModal, setShowCreateFromTemplateModal] =
    useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)
  const teamID = useSelector(getCurrentTeamID)!
  const appID = useSelector(getAppId)!

  const handleForkApp = async (appId: string, teamIdentifier?: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await fetchPubicAppInitData(
          appId,
          "-2",
          teamIdentifier,
        )
        dispatch(
          componentsActions.deleteComponentNodeReducer({
            displayNames: ["page1"],
          }),
        )
        dispatch(
          componentsActions.addComponentReducer(data.components.childrenNode),
        )
        DisplayNameGenerator.updateDisplayNameList(
          data.components,
          data.actions,
        )
        dispatch(
          componentsActions.setComponentPropsReducer({
            displayName: "root",
            updateSlice: data.components.props!,
          }),
        )
        const actions = await fetchBatchCreateAction(
          teamID,
          appID,
          data.actions,
        )
        dispatch(actionActions.batchAddActionItemReducer(actions))
        resolve(undefined)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleShowMore = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "create_app_modal_more",
        parameter1: REPORT_PARAMETER.MORE_TEMPLATE,
      },
      "both",
    )
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "create_app_modal",
        parameter1: REPORT_PARAMETER.MORE_TEMPLATE,
      },
      "both",
    )
    setShowCreateFromTemplateModal(true)
  }

  return (
    <>
      <div css={containerStyle}>
        {templateList.slice(0, showCardCount).map((info, i) => {
          const { app, marketplace } = info || {}
          return (
            <div
              key={app?.appId || i}
              css={templateCardContainerStyle(i, showAnimation)}
              onMouseEnter={() => handleShowPreview(marketplace?.config?.cover)}
              onMouseLeave={() => handleShowPreview()}
            >
              <AppTemplateCard
                bd="none"
                w="200px"
                teamIdentifier={marketplace?.contributorTeam?.teamIdentifier}
                handleForkApp={async (
                  appId: string,
                  teamIdentifier?: string,
                ) => {
                  track?.(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    {
                      element: "create_app_modal_use_template",
                      parameter1: REPORT_PARAMETER.BLANK_APP,
                    },
                    "both",
                  )
                  handleForkApp(appId, teamIdentifier)
                }}
                appID={app?.appId}
                cover={marketplace?.config?.cover}
                appName={app?.appName}
              />
            </div>
          )
        })}
        <div css={moreContainerStyle(showCardCount)} onClick={handleShowMore}>
          <div css={moreContentStyle}>
            <span>{t("new_dashboard.create_new.more")}</span>
            <NextIcon size="16px" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCreateFromTemplateModal && (
          <CreateFromTemplateModal
            hiddenCreateBlank
            handleForkApp={async (appId: string, teamIdentifier?: string) => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "create_app_modal_use_template",
                  parameter1: REPORT_PARAMETER.CREATE_APP_MODAL,
                },
                "both",
              )
              handleForkApp(appId, teamIdentifier)
            }}
            closeModal={() => setShowCreateFromTemplateModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
export default BuildByTemplate
