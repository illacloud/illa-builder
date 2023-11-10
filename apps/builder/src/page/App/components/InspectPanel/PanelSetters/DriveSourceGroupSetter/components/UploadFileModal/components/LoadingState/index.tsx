import { FC } from "react"
import { Loading } from "@illa-design/react"
import { loadingContainerStyle } from "./style"

const LoadingState: FC = () => {
  return (
    <div css={loadingContainerStyle}>
      <Loading colorScheme="techPurple" />
    </div>
  )
}

export default LoadingState
