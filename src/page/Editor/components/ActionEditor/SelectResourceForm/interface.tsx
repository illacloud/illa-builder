import { ApiType, DatabaseType } from "../FormContainer/interface"

export interface ApiItemProps {
  title: ApiType
  img: JSX.Element
}

export interface DatabaseItemProps {
  title: DatabaseType
  img: JSX.Element
}

export interface SelectResourceFormProps {
  onSelect: (type: ApiType | DatabaseType) => void
}
