export interface MongoDbConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}
