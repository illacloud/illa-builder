import { ChangeLayoutBarProps } from "../interface"

export interface changeHorizontalLayoutBarProps extends ChangeLayoutBarProps {
  sectionName: "headerSection" | "footerSection"
  direction: "left" | "right"
}
