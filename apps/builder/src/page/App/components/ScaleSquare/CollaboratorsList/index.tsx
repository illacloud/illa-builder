import { FC, useLayoutEffect, useMemo, useState } from "react"
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
} from "@/page/App/components/ScaleSquare/CollaboratorsList/style"
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
}> = ({ users, disableMargin, currentState, containerWidth, nameChanging }) => {
  const [listShow, setListShow] = useState(false)
  const [listContainerRef, bounds] = useMeasure()
  const { t } = useTranslation()
  const [displayDataList, setDisplayDataList] = useState<CollaboratorsInfo[]>(
    [],
  )
  const [showMoreIcon, setShowMoreIcon] = useState(false)
  const length = users.length

  useLayoutEffect(() => {
    const listLength = users.length
    if (listLength < 3) {
      setDisplayDataList(users)
      setShowMoreIcon(false)
      return
    }
    if (currentState === "right") {
      if (containerWidth > MIN_THREE_AVATAR_MOVE_BAR_WIDTH) {
        setDisplayDataList(listLength === 3 ? users : users.slice(0, 2))
        setShowMoreIcon(listLength === 3 ? false : true)
      } else {
        setDisplayDataList(users.slice(0, 1))
        setShowMoreIcon(true)
      }
      return
    }
    if (
      (currentState === "left" && bounds.width <= MIN_THREE_AVATAR_WIDTH) ||
      disableMargin
    ) {
      setDisplayDataList(users.slice(0, 1))
      setShowMoreIcon(true)
      return
    }
  }, [bounds.width, currentState, disableMargin, containerWidth, users])

  const renderListItem = useMemo(
    () => (
      <>
        {displayDataList.map(({ avatar, id, nickname }, index) => (
          <Avatar
            userId={id}
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
                      userId={id}
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
