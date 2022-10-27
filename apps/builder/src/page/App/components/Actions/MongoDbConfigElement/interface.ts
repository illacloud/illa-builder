import { Control } from "react-hook-form"

export interface MongoDbConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}

export interface MongoDbConfigModeProps {
  control: Control
  resourceId?: string
}
