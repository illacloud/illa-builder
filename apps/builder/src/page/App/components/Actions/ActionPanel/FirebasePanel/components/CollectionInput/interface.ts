import { FirebaseCollectionType } from "@illa-public/public-types"

export interface CollectionInputProps {
  handleValueChange: (value: string, name: string) => void
  collectionType: FirebaseCollectionType
  value: string
}
