export interface ClickhouseConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
  onTestConnectReport?: (resourceType: string) => void
}
