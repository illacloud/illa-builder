import { ApiType, DatabaseType } from "../FormContainer/interface"
import { ReactNode } from "react"

export interface ApiItemProps {
  title: ApiType
  img: ReactNode
}

export interface DatabaseItemProps {
  title: DatabaseType
  img: ReactNode
}

export interface SelectResourceFormProps {
  onSelect: (type: ApiType | DatabaseType) => void
}
