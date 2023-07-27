import { FC } from "react"
import { UserMessageProps } from "@/page/AIAgent/components/UserMessage/interface"

export const UserMessage: FC<UserMessageProps> = (props) => {
  const { message } = props
  return <div></div>
}

export default UserMessage
UserMessage.displayName = "UserMessage"
