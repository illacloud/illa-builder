import { HTMLAttributes } from "react"

export interface SearchHeaderProps extends HTMLAttributes<HTMLDivElement> {
  onSearch: (value: string) => void
}
