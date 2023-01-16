import { FC, useLayoutEffect, useMemo, useState } from "react"
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
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export const CollaboratorsList: FC<{
  users: CollaboratorsInfo[]
  disableMargin: boolean
  currentState: string
  containerWidth: number
}> = ({ users, disableMargin, currentState, containerWidth }) => {
  const [listShow, setListShow] = useState(false)
  const [listContainerRef, bounds] = useMeasure()
  const [displayDataList, setDisplayDataList] =
    useState<CollaboratorsInfo[]>(users)
  const [showMoreIcon, setShowMoreIcon] = useState(false)
  const length = users.length

  useLayoutEffect(() => {
    const listLength = users.length
    if (listLength < 3) {
      return
    }
    if (currentState === "right" && containerWidth > 74) {
      setDisplayDataList(listLength === 3 ? users : users.slice(0, 2))
      setShowMoreIcon(listLength === 3 ? false : true)
    }
    if ((currentState === "left" && bounds.width < 50) || disableMargin) {
      setDisplayDataList(users.slice(0, 1))
      setShowMoreIcon(true)
    }
  }, [
    JSON.stringify(users),
    bounds.width,
    currentState,
    disableMargin,
    containerWidth,
  ])

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
          />
        ))}
        {showMoreIcon && (
          <Trigger
            trigger="hover"
            content={
              <div css={listContainerStyle}>
                <div css={listItemContentStyle}>Current editors</div>
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
    [displayDataList, listShow, showMoreIcon, users],
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
