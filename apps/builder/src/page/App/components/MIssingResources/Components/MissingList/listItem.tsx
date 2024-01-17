import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  PlayOutlineIcon,
  QuestionCircleIcon,
  SuccessCircleIcon,
} from "@illa-design/react"
import { getActionIDMapAction } from "@/redux/currentApp/action/actionSelector"
import ResourceChoose from "../ResourceChoose"
import { ItemProps } from "./itemInterface"
import {
  cellFontStyle,
  cellStyle,
  columnContainerStyle,
  statusContainerStyle,
  statusTextStyle,
} from "./style"

const getStatusIcon = (status: "missing" | "completed") => {
  switch (status) {
    case "missing": {
      return <QuestionCircleIcon />
    }
    case "completed": {
      return <SuccessCircleIcon />
    }
  }
}

export const ListItem: FC<ItemProps> = (props) => {
  const {
    actionIDs,
    resourceType,
    replacementResourceID,
    status,
    tutorialHref,
    index,
    handleChangePlaceInfo,
  } = props

  const actions = useSelector(getActionIDMapAction)
  const { t } = useTranslation()

  const shownNames = actionIDs.map((id) => actions[id].displayName).join(" ")

  const getStatusText = (status: "missing" | "completed") => {
    switch (status) {
      case "missing": {
        return t("Missing")
      }
      case "completed": {
        return t("Completed")
      }
    }
  }

  const openTutorial = () => {
    window.open(tutorialHref, "_blank", "width=800px,height=500px")
  }

  const changeResourceID = (resourceID: string) => {
    handleChangePlaceInfo(index, resourceID, actionIDs)
  }

  return (
    <div css={columnContainerStyle}>
      <div css={cellStyle("128px")}>
        <span css={cellFontStyle}>{shownNames}</span>
      </div>
      <div css={cellStyle("64px")}>
        <span css={cellFontStyle}>{resourceType}</span>
      </div>
      <div css={cellStyle("200px")}>
        <ResourceChoose
          resourceID={replacementResourceID}
          setGeneratorVisible={() => {}}
          changeResourceID={changeResourceID}
        />
      </div>
      <div css={cellStyle("96px")}>
        <div css={statusContainerStyle(status)}>
          {getStatusIcon(status)}
          <span css={statusTextStyle}>{getStatusText(status)}</span>
        </div>
      </div>
      <div css={cellStyle("96px")}>
        <Button
          leftIcon={<PlayOutlineIcon />}
          onClick={openTutorial}
          variant="outline"
          colorScheme="grayBlue"
        >
          watch
        </Button>
      </div>
    </div>
  )
}
