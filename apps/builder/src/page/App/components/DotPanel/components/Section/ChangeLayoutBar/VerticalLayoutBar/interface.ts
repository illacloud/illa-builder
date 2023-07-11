import { ChangeLayoutBarProps } from "../interface"

export interface ChangeVerticalLayoutBarProps extends ChangeLayoutBarProps {
  direction: "top" | "bottom"
  sectionName: "leftSection" | "rightSection"
}
