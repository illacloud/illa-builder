import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTutorialLinkMapActions } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { MissingResourceFooter } from "../Footer"
import { MissingListProps } from "./interface"
import { ListItem } from "./listItem"
import {
  cellStyle,
  columnContainerStyle,
  missingListContainerStyle,
} from "./style"

const MissingList: FC<MissingListProps> = (props) => {
  const { handleCancelModal } = props
  const missingResourceActionList = useSelector(getTutorialLinkMapActions)
  const [replaceInfo, setReplaceInfo] = useState(
    new Map<
      string,
      {
        resourceID: string
        actionIDs: string[]
      }
    >(),
  )
  const dispatch = useDispatch()
  const handleChangePlaceInfo = (
    index: string,
    resourceID: string,
    actionIDs: string[],
  ) => {
    setReplaceInfo((prevInfo) => {
      const newReplaceInfo = new Map(prevInfo)
      newReplaceInfo.set(index, {
        resourceID,
        actionIDs,
      })
      return newReplaceInfo
    })
  }

  const handleConfirmModal = () => {
    const replaceInfoList = Array.from(replaceInfo.values())
    if (replaceInfoList.length === 0) return
    const payload: Record<string, { actionID: string; resourceID: string }> = {}
    replaceInfoList.forEach(({ actionIDs, resourceID }) => {
      actionIDs.forEach((actionID) => {
        payload[actionID] = { actionID, resourceID }
      })
    })
    dispatch(actionActions.batchUpdateResourceID(payload))
  }

  return (
    <>
      <div css={missingListContainerStyle}>
        <header css={columnContainerStyle}>
          <p css={cellStyle("128px")}>Affected actions</p>
          <p css={cellStyle("64px")}>Type</p>
          <p css={cellStyle("200px")}>Replacement</p>
          <p css={cellStyle("96px")}>Status</p>
          <p css={cellStyle("96px")}>Tutorial</p>
        </header>
        {Object.keys(missingResourceActionList).map((key) => {
          const item = missingResourceActionList[key]
          return (
            <ListItem
              key={key}
              index={key}
              actionIDs={item.actionIDs}
              tutorialHref={item.tutorialHref}
              resourceType={item.resourceType}
              replacementResourceID={replaceInfo.get(key)?.resourceID}
              status={!!replaceInfo.get(key) ? "completed" : "missing"}
              handleChangePlaceInfo={handleChangePlaceInfo}
            />
          )
        })}
      </div>
      <MissingResourceFooter
        handleCancelModal={handleCancelModal}
        handleConfirmModal={handleConfirmModal}
      />
    </>
  )
}

export default MissingList
