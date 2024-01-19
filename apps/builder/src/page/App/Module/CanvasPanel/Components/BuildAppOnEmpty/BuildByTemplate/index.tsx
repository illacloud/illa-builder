import {
  AppTemplateCard,
  CreateFromTemplateModal,
} from "@illa-public/create-app"
import { ProductMarketApp } from "@illa-public/market-app"
import { AnimatePresence } from "framer-motion"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { NextIcon } from "@illa-design/react"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { fetchPubicAppInitData } from "@/services/apps"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
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
        dispatch(actionActions.batchAddActionItemReducer(data.actions))
        dispatch(executionActions.startExecutionReducer())
        resolve(undefined)
      } catch (error) {
        reject(error)
      }
    })
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
              onMouseEnter={() => handleShowPreview(app?.config?.cover)}
              onMouseLeave={() => handleShowPreview()}
            >
              <AppTemplateCard
                bd="none"
                teamIdentifier={marketplace?.contributorTeam?.teamIdentifier}
                handleForkApp={handleForkApp}
                appID={app?.appId}
                cover={app?.config?.cover}
                appName={app?.appName}
              />
            </div>
          )
        })}
        <div
          css={moreContainerStyle(showCardCount)}
          onClick={() => setShowCreateFromTemplateModal(true)}
        >
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
            handleForkApp={handleForkApp}
            closeModal={() => setShowCreateFromTemplateModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
export default BuildByTemplate
