import { FC } from "react"
import {
  getListItemContainerStyle,
  nicknameStyle,
} from "@/page/App/Module/PageNavBar/CollaboratorsList/ListItem/style"
import { Avatar } from "@/page/App/components/Avatar"
import { UserListItemProps } from "./interface"

export const UserListItem: FC<UserListItemProps> = (props) => {
  const { id, avatar, nickname, type } = props

  return (
    <div css={getListItemContainerStyle(type)}>
      <Avatar
        userID={id}
        nickname={nickname}
        avatar={avatar}
        showTooltips={true}
      />
      {type === "list" && <span css={nicknameStyle}>{nickname || ""}</span>}
    </div>
  )
}
