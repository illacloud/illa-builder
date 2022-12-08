import {
  CollectionType,
  Params,
} from "@/redux/currentApp/action/firebaseAction"

export interface CollectionInputProps {
  handleValueChange: (value: string, name: string) => void
  collectionType: CollectionType
  value: string
}
