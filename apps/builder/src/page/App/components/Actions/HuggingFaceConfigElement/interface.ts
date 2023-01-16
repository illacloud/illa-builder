export interface HuggingFaceConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}
