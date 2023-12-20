export interface TagContainerProps {
  v: string
  c: string
  allowWrap?: boolean
  handleUpdateWith?: (v: number) => void
  handleOnSelect?: (v: string) => void
}
