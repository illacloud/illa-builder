import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"

export interface ChangeLayoutBarProps {
  direction: "top" | "bottom" | "left" | "right"
  currentPosition: SECTION_POSITION
  currentPageName: string
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
  targetSectionName: "leftSection" | "rightSection"
}
