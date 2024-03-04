import { KnowledgeFile } from "@illa-public/public-types"
import { FC } from "react"
import { containerStyle } from "./style"

interface ShowFilesMobileProps {
  knowledgeFiles: KnowledgeFile[]
}
const ShowFilesMobile: FC<ShowFilesMobileProps> = () => {
  return (
    <div css={containerStyle}>
      {/* {
        knowledgeFiles.map((item) => (

        ))
      } */}
    </div>
  )
}

export default ShowFilesMobile
