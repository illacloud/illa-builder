import {
  ApiType,
  DatabaseType,
} from "@/page/Editor/components/ActionEditor/interface"

export interface ApiItemProps {
  title: string
  img: JSX.Element
  draft?: boolean
  type: ApiType
}

export interface DatabaseItemProps {
  title: string
  img: JSX.Element
  draft?: boolean
  type: DatabaseType
}

export interface ResourceFormSelectorProps {
  onSelect: (type: ApiType | DatabaseType) => void
}
