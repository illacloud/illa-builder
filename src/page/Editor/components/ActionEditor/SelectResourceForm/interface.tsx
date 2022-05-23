import { ApiType, DatabaseType } from "@/page/Editor/components/ActionEditor/interface"

export interface ApiItemProps {
  title: ApiType
  img: JSX.Element
  draft?: boolean
}

export interface DatabaseItemProps {
  title: DatabaseType
  img: JSX.Element
  draft?: boolean
}

export interface SelectResourceFormProps {
  onSelect: (type: ApiType | DatabaseType) => void
}
