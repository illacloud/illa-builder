import { Control, FieldValues, UseFormWatch } from "react-hook-form"

export interface MongoDbConfigModeProps {
  control: Control
  watch: UseFormWatch<FieldValues>
  resourceID?: string
}
