export type ActionRestultStatus = "success" | "error"

export interface ActionResultProps {
  result?: string
  type?: string
  status?: ActionRestultStatus
  onClose?: () => void
}
