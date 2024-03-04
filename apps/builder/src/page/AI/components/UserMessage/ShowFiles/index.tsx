import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE, KnowledgeFile } from "@illa-public/public-types"
import { FC } from "react"
import { Tag, getColor } from "@illa-design/react"
import { fileItemContainerStyle, fileTypeIconStyle } from "./style"

interface ShowFilesProps {
  knowledgeFiles: KnowledgeFile[]
}

const ShowFiles: FC<ShowFilesProps> = ({ knowledgeFiles }) => {
  return (
    <div css={fileItemContainerStyle}>
      {knowledgeFiles.map((item) => (
        <Tag
          key={item.name}
          bg={getColor("grayBlue", "09")}
          icon={getFileIconByContentType(
            GCS_OBJECT_TYPE.FILE,
            item.type,
            fileTypeIconStyle,
          )}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  )
}

export default ShowFiles
