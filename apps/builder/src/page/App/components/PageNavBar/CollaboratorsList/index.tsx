import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Trigger } from "@illa-design/react"
import { UserListItem } from "@/page/App/components/PageNavBar/CollaboratorsList/ListItem"
import {
  avatarContainerStyle,
  moreIconStyle,
  userInfoListContainerStyle,
} from "@/page/App/components/PageNavBar/CollaboratorsList/style"
import { getCurrentAppAttachUsers } from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export const CollaboratorsList: FC = () => {
  const [mouseOver, setMouseOver] = useState(false)
  const currentCollaborator = useSelector(getCurrentAppAttachUsers) || []
  const currentCollaborators = [
    ...currentCollaborator,
    ...currentCollaborator,
    ...currentCollaborator,
    ...currentCollaborator,
    ...currentCollaborator,
  ]
  const usersLength = currentCollaborators.length

  const getRenderDOM = (dataList: CollaboratorsInfo[], type?: string) => (
    <>
      {dataList.map((user: CollaboratorsInfo, index) => {
        const { id, nickname, avatar } = user
        return (
          <UserListItem
            id={`${id}`}
            type={type}
            nickname={nickname}
            avatar={avatar}
            key={index}
          />
        )
      })}
    </>
  )
  if (usersLength <= 4) {
    return (
      <div css={avatarContainerStyle}>{getRenderDOM(currentCollaborators)}</div>
    )
  }

  return (
    <div css={avatarContainerStyle}>
      {getRenderDOM(currentCollaborators.slice(0, 3))}
      <Trigger
        trigger="hover"
        popupVisible={mouseOver}
        onVisibleChange={setMouseOver}
        content={
          <div css={userInfoListContainerStyle}>
            {getRenderDOM(currentCollaborators, "list")}
          </div>
        }
        position="bottom-end"
        showArrow={false}
        withoutPadding
        colorScheme="white"
      >
        <div css={moreIconStyle}>
          <span>{usersLength - 3 <= 99 ? `+${usersLength - 3}` : "99+"}</span>
        </div>
      </Trigger>
    </div>
  )
}
