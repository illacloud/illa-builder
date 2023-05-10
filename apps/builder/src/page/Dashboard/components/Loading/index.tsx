import { FC } from "react"
import { Loading } from "@illa-design/react"
import { loadingStyle } from "./style"

export const DashBoardLoading: FC = () => {
  return <Loading _css={loadingStyle} colorScheme="techPurple" />
}
