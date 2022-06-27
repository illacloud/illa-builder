export interface ApiItemProps {
  title: string
  img: JSX.Element
  draft?: boolean
  type: string
}

export interface DatabaseItemProps {
  title: string
  img: JSX.Element
  draft?: boolean
  type: string
}

export interface ResourceFormSelectorProps {
  onSelect: (type: string) => void
}
