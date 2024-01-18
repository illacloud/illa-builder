import { getTutorialLink } from "@illa-public/missing-resource-module/util"
import { ActionContent, ActionItem } from "@illa-public/public-types"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { getAIAgentIDMapAgent } from "../../aiAgent/dashboardTeamAIAgentSelector"
import { getResourceIDMapResource } from "../../resource/resourceSelector"
import { getGlobalDataToActionList } from "../components/componentsSelector"

export const getActionList = (state: RootState) => state.currentApp.action

export const getActionItemByDisplayName = (
  state: RootState,
  displayName: string,
) => {
  const actionList = getActionList(state)
  return actionList.find((item) => {
    return item.displayName === displayName
  })
}

export const getActionIDMapAction = createSelector(
  [getActionList],
  (actions) => {
    const actionIDMapAction: Record<string, ActionItem<ActionContent>> = {}
    actions.forEach((action) => {
      actionIDMapAction[action.actionID] = action
    })
    return actionIDMapAction
  },
)

export const getDisplayNameMapActions = createSelector(
  [getActionList],
  (actions) => {
    const displayNameMapActions: Record<string, any> = {}
    actions.forEach((action) => {
      displayNameMapActions[action.displayName] = action
    })
    return displayNameMapActions
  },
)

export const getActionMixedList = createSelector(
  [getActionList, getGlobalDataToActionList],
  (actionList, globalDataList) => {
    return actionList.concat(...globalDataList)
  },
)

export const getMissingResourceActionList = createSelector(
  [getResourceIDMapResource, getActionList, getAIAgentIDMapAgent],
  (resourceMap, actionList, aiAgentList) => {
    const missingResourceActionList: ActionItem<ActionContent>[] = []
    actionList.forEach((action) => {
      const resource = resourceMap[action.resourceID!]
      const agent = aiAgentList[action.resourceID!]
      if (
        !resource &&
        !agent &&
        action.actionType !== "globalData" &&
        action.actionType !== "transformer" &&
        action.actionType !== "illadrive"
      ) {
        missingResourceActionList.push(action)
      }
    })
    return missingResourceActionList
  },
)

export const getMissingResourceActionGroupByTutorialOrResourceID =
  createSelector(
    [getMissingResourceActionList],
    (missingResourceActionList) => {
      const tutorialLinkMapActions: Record<
        string,
        {
          actionIDs: string[]
          resourceType: string
          tutorialHref: string
          hasLink: boolean
        }
      > = {}
      missingResourceActionList.forEach((action) => {
        const hrefLink = action.config.tutorialLink

        if (hrefLink) {
          if (!tutorialLinkMapActions[hrefLink]) {
            tutorialLinkMapActions[hrefLink] = {
              actionIDs: [],
              resourceType: action.actionType,
              tutorialHref: hrefLink,
              hasLink: true,
            }
          }
          tutorialLinkMapActions[hrefLink].actionIDs.push(action.actionID)
        } else {
          const resourceID = action.resourceID!
          if (!tutorialLinkMapActions[resourceID]) {
            tutorialLinkMapActions[resourceID] = {
              actionIDs: [],
              resourceType: action.actionType,
              tutorialHref: getTutorialLink(action.actionType),
              hasLink: false,
            }
          }
          tutorialLinkMapActions[resourceID].actionIDs.push(action.actionID)
        }
      })
      return tutorialLinkMapActions
    },
  )

export const getHasMissingResourceAction = createSelector(
  [getMissingResourceActionList],
  (missingResourceActionList) => {
    return missingResourceActionList.length > 0
  },
)
