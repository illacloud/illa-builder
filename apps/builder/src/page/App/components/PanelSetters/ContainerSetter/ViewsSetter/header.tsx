import { FC } from "react"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Button } from "@illa-design/button"
import { AddIcon } from "@illa-design/icon"

export const HeaderWrapperStyle = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  padding: 8px 8px 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderLabelStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  font-size: 14px;
`

export interface HeaderProps {
  labelName: string
  addAction: () => void
  hasAddAction: boolean
}

export const Header: FC<HeaderProps> = props => {
  const { labelName, addAction, hasAddAction } = props
  return (
    <div css={HeaderWrapperStyle}>
      <span css={HeaderLabelStyle}>{labelName}</span>
      {hasAddAction && (
        <Button
          leftIcon={<AddIcon />}
          colorScheme="techPurple"
          variant="text"
          onClick={addAction}
        >
          New
        </Button>
      )}
    </div>
  )
}
