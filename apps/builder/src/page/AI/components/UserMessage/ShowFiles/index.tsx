import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE, KnowledgeFile } from "@illa-public/public-types"
import { FC } from "react"
import {
  containerStyle,
  fileItemStyle,
  fileNameStyle,
  fileTypeIconStyle,
  iconContainerStyle,
} from "./style"

interface ShowFilesProps {
  knowledgeFiles: KnowledgeFile[]
}
const ShowFiles: FC<ShowFilesProps> = ({ knowledgeFiles }) => {
  return (
    <div css={containerStyle}>
      {knowledgeFiles.map((item) => (
        <div key={item.name} css={fileItemStyle}>
          <span css={iconContainerStyle}>
            {getFileIconByContentType(
              GCS_OBJECT_TYPE.FILE,
              item.type,
              fileTypeIconStyle,
            )}
          </span>
          <span css={fileNameStyle}>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ShowFiles
