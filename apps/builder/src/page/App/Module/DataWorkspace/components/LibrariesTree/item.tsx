import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC } from "react"
import { Link } from "react-router-dom"
import { DocsIcon } from "@illa-design/react"
import { LibrariesItemProps } from "./interface"
import {
  actionGroupContainerStyle,
  aliasContainerStyle,
  itemContainerStyle,
  titleContainerStyle,
  titleStyle,
} from "./style"

export const LibrariesItem: FC<LibrariesItemProps> = (props) => {
  const { title, alias, docLink } = props
  return (
    <div css={itemContainerStyle}>
      <div css={titleContainerStyle}>
        <span css={titleStyle}>{title}</span>
        <div css={actionGroupContainerStyle}>
          <Link to={docLink} target="_blank">
            <IconHotSpot>
              <DocsIcon />
            </IconHotSpot>
          </Link>
        </div>
      </div>
      <p css={aliasContainerStyle}>{alias ?? title}</p>
    </div>
  )
}
