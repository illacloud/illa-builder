import { DividerProps } from "@illa-design/divider"

export interface WrappedDividerProps
  extends Pick<
    DividerProps,
    "text" | "textAlign" | "colorScheme" | "textSize"
  > {}
