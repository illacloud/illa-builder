import { FC } from "react"
import { Avatar } from "@/page/App/components/Avatar"
import {
  avatarStyle,
  getListItemContainerStyle,
  nicknameStyle,
} from "@/page/App/components/PageNavBar/CollaboratorsList/ListItem/style"
import { UserListItemProps } from "./interface"

export const UserListItem: FC<UserListItemProps> = (props) => {
  const { id, avatar, nickname, type } = props

  return (
    <div css={getListItemContainerStyle(type)}>
      <Avatar
        userId={id}
        nickname={nickname}
        avatar={avatar}
        showTooltips={true}
      />
      {type === "list" && <span css={nicknameStyle}>{nickname || ""}</span>}
    </div>
  )
}
