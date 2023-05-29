import { FC } from "react"
import { ReactComponent as DeleteSvg } from "@/assets/chat/delete.svg"
import { ReactComponent as ReplaySvg } from "@/assets/chat/replay.svg"
import { IMessageItem } from "./interface"
import { optionsStyle } from "./style"

export const Options: FC<IMessageItem> = ({
  message,
  toolbarDelete,
  handleOnReplay,
  toolbarReplay,
  handleOnDelete,
}) => {
  console.log("123454")
  return (
    <div css={optionsStyle(Boolean(toolbarReplay && toolbarDelete))}>
      {toolbarReplay && (
        <div
          onClick={() => {
            handleOnReplay && handleOnReplay(message)
          }}
        >
          <ReplaySvg />
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
