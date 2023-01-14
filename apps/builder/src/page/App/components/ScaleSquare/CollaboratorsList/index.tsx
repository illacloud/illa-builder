import { FC, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { MoreIcon, Trigger } from "@illa-design/react"
import {
  getComponentUsersListContainerStyle,
  listContainerStyle,
  listItemAvatarStyle,
  listItemContentStyle,
  listItemNicknameStyle,
  listItemStyle,
  moreIconStyle,
} from "@/page/App/components/ScaleSquare/CollaboratorsList/style"
import { getComponentAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import { ListItem } from "./listItem"

export const CollaboratorsList: FC<{
  displayName: string
}> = ({ displayName }) => {
  const componentsAttachedUsers = useSelector(
    getComponentAttachUsers,
  ) as Record<string, CollaboratorsInfo[]>
  const usersList = componentsAttachedUsers[displayName] || []
  let result = [
    ...usersList,
    ...usersList,
    ...usersList,
    // ...usersList,
    // ...usersList,
    // ...usersList,
  ]
  const length = result.length

  const [listShow, setListShow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  if (containerRef.current) {
    const styles = window.getComputedStyle(containerRef.current)
    console.log(
      styles.width,
      containerRef.current?.offsetWidth,
      containerRef.current?.clientWidth,
    )
  }

  if (!length) {
    return null
  }

  const renderListItem =
    length <= 3 ? (
      <>
        {result.map(({ avatar, id, nickname }, index) => (
          <ListItem
            avatar={avatar}
            nickname={nickname}
            userId={id}
            key={index}
          />
        ))}
      </>
    ) : (
      <>
        {result.slice(0, 2).map(({ avatar, id, nickname }, index) => (
          <ListItem
            avatar={avatar}
            nickname={nickname}
            userId={id}
            key={index}
          />
        ))}
        <Trigger
          trigger="hover"
          content={
            <div css={listContainerStyle}>
              <div css={listItemContentStyle}>Current editors</div>
              {result.map(({ avatar, id, nickname }, index) => (
                <div key={index} css={listItemStyle}>
                  {avatar ? (
                    <img src={avatar} css={listItemAvatarStyle} />
                  ) : (
                    <ListItem
                      type="list"
                      avatar={avatar}
                      nickname={nickname}
                      userId={id}
                      key={index}
                    />
                  )}
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
      </>
    )

  return (
    <div css={getComponentUsersListContainerStyle(length)} ref={containerRef}>
      {renderListItem}
    </div>
  )
}
