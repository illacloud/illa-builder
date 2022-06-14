export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps {
  value?: number
  tooltipText?: string
  showText?: boolean
  color?: string
  trailColor?: string
  strokeWidth?: string
  alignment?: Alignment
}
