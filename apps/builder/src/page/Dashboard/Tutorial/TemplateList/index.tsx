import { FC } from "react"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import {
  descStyle,
  forkIconStyle,
  forkItemStyle,
  iconStyle,
  itemStyle,
  titleStyle,
} from "@/page/Dashboard/Tutorial/TemplateList/style"

export const TemplateList: FC = () => {
  const list = [
    {
      name: "Table",
      desc: "A template designed to show off visualization capabilities",
      icon: "",
    },
  ]
  return (
    <div>
      {list.map((item) => {
        return (
          <div css={itemStyle}>
            <div css={iconStyle} />
            <div>
              <div css={titleStyle}>{item.name}</div>
              <div css={descStyle}>{item.desc}</div>
            </div>
            <div css={forkItemStyle}>
              <ForkIcon css={forkIconStyle} />
              Fork
            </div>
          </div>
        )
      })}
    </div>
  )
}

TemplateList.displayName = "TemplateList"
