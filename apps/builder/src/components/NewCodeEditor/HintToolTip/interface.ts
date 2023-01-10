import { Dispatch, ReactNode, SetStateAction } from "react"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface HintTooltipProps {
  isEditorFocused: boolean
  hasError?: boolean
  resultType?: VALIDATION_TYPES
  result?: string
  children: ReactNode
}

export interface HintTooltipContentProps
  extends Pick<HintTooltipProps, "hasError" | "resultType" | "result"> {
  setIsHovered: Dispatch<SetStateAction<boolean>>
}
