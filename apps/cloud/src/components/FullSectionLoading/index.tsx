import { FC } from "react"
import { Loading } from "@illa-design/react"
import { fullSectionLoadingWrapperStyle } from "./style"

export const FullSectionLoading: FC = () => {
  return (
    <div css={fullSectionLoadingWrapperStyle}>
      <Loading colorScheme="techPurple" />
    </div>
  )
}

FullSectionLoading.displayName = "FullSectionLoading"
