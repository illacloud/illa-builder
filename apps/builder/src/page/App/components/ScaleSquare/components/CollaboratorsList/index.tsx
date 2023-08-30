import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import useMeasure from "react-use-measure"
import { MoreIcon, Trigger } from "@illa-design/react"
import { Avatar } from "@/page/App/components/Avatar"
import {
  getComponentUsersListContainerStyle,
  listContainerStyle,
  listItemContentStyle,
  listItemNicknameStyle,
  listItemStyle,
  moreIconStyle,
} from "@/page/App/components/ScaleSquare/components/CollaboratorsList/style"
import {
  MIN_THREE_AVATAR_MOVE_BAR_WIDTH,
  MIN_THREE_AVATAR_WIDTH,
} from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export const CollaboratorsList: FC<{
  users: CollaboratorsInfo[]
  disableMargin: boolean
  currentState: string
  containerWidth: number
  nameChanging?: boolean
}> = ({ users, disableMargin, currentState, containerWidth }) => {
  const [listShow, setListShow] = useState(false)
  const [listContainerRef, bounds] = useMeasure()
  const { t } = useTranslation()
  const length = users.length

  const { showMoreIcon, displayDataList } = useMemo(() => {
    let showMoreIcon = false
    let displayDataList: CollaboratorsInfo[] = []

    const listLength = users.length
    if (listLength < 3) {
      return {
        showMoreIcon: false,
        displayDataList: users,
      }
    }
    if (currentState === "right") {
      return containerWidth > MIN_THREE_AVATAR_MOVE_BAR_WIDTH
        ? {
            showMoreIcon: listLength !== 3,
            displayDataList: listLength === 3 ? users : users.slice(0, 2),
          }
        : {
            showMoreIcon: true,
            displayDataList: users.slice(0, 1),
          }
    }
    if (
      (currentState === "left" && bounds.width <= MIN_THREE_AVATAR_WIDTH) ||
      disableMargin
    ) {
      return {
        showMoreIcon: true,
        displayDataList: users.slice(0, 1),
      }
    }
    return {
      showMoreIcon,
      displayDataList,
    }
  }, [bounds.width, containerWidth, currentState, disableMargin, users])

  const renderListItem = useMemo(
    () => (
      <>
        {displayDataList.map(({ avatar, id, nickname }, index) => (
          <Avatar
            userID={id}
            nickname={nickname}
            avatar={avatar}
            showType="components"
            key={index}
            showTooltips={true}
          />
        ))}
        {showMoreIcon && (
          <Trigger
            trigger="hover"
            content={
              <div css={listContainerStyle}>
                <div css={listItemContentStyle}>
                  {t("editor.component.editor_list")}
                </div>
                {users.map(({ avatar, id, nickname }, index) => (
                  <div key={index} css={listItemStyle}>
                    <Avatar
                      userID={id}
                      nickname={nickname}
                      avatar={avatar}
                      showType="components"
                      type="list"
                      key={index}
                    />
                    <span css={listItemNicknameStyle}>{nickname || ""}</span>
                  </div>
                ))}
              </div>
            }
            popupVisible={listShow}
            onVisibleChange={setListShow}
            position="bottom-start"
            showArrow={false}
            withoutPadding
            colorScheme="white"
          >
            <div css={moreIconStyle}>
              <MoreIcon />
            </div>
          </Trigger>
        )}
      </>
    ),
    [displayDataList, listShow, showMoreIcon, t, users],
  )

  if (!length) {
    return null
  }

  return (
    <div
      css={getComponentUsersListContainerStyle(length, disableMargin)}
      ref={listContainerRef}
    >
      {renderListItem}
    </div>
  )
}

CollaboratorsList.displayName = "CollaboratorsList"
