export interface TitleInputProps
  extends Omit<HTMLAttributes<HTMLDataElement>, "title"> {
  title?: string
  activeActionItem?: ActionItem | null
}
