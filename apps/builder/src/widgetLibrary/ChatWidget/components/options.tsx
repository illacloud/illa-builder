import { FC } from "react"
import { ReactComponent as DeleteSvg } from "@/assets/chat/delete.svg"
import { ReactComponent as ReplySvg } from "@/assets/chat/replay.svg"
import { OptionsProps } from "@/widgetLibrary/ChatWidget/interface"
import { optionsStyle } from "@/widgetLibrary/ChatWidget/style"

export const Options: FC<Partial<OptionsProps>> = ({
  message,
  toolbarDelete,
  handleOnReply,
  toolbarReply,
  handleOnDelete,
}) => {
  return (
    <div css={optionsStyle(Boolean(toolbarReply && toolbarDelete))}>
      {toolbarReply && (
        <div
          onClick={() => {
            handleOnReply && handleOnReply(message)
          }}
        >
          <ReplySvg />
        </div>
      )}
      {toolbarDelete && (
        <div
          onClick={() => {
            handleOnDelete && handleOnDelete(message)
          }}
        >
          <DeleteSvg />
        </div>
      )}
    </div>
  )
}
