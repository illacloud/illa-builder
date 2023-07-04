import { FC } from "react"
import { MessageSpecProps } from "../interface"
import { replayImageStyle } from "../style"

export const ImageMessage: FC<MessageSpecProps> = ({ content, isReply }) => {
  return (
    <>
      {isReply ? (
        <div css={replayImageStyle}>
          <img src={content} />
        </div>
      ) : (
        <img src={content} alt="" width="300px" />
      )}
    </>
  )
}
