export interface ClickhouseConfigElementProps {
  resourceID?: string
  onBack: () => void
  onFinished: (resourceID: string) => void
}
