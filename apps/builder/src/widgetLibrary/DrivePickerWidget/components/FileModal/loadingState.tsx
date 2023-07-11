import { FC } from "react"
import { Spin } from "@illa-design/react"
import { loadingContainerStyle } from "./style"

export const LoadingState: FC = () => {
  return (
    <div css={loadingContainerStyle}>
      <Spin />
    </div>
  )
}
