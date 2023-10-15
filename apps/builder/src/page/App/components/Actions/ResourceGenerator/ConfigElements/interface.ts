export interface BaseConfigElementProps {
  resourceID?: string
  hasFooter?: boolean
  onBack: () => void
  onFinished: (resourceID: string) => void
}
