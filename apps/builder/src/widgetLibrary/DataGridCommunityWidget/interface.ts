import { BaseWidgetProps } from "@/widgetLibrary/interface"

export enum Columns {
  Auto = "auto",
  Text = "text",
  Date = "date",
  Tag = "tag",
  Time = "time",
  DateTime = "datetime",
  Number = "number",
  Percent = "percent",
  Link = "link",
  Button = "button",
  ButtonGroup = "buttongroup",
  Boolean = "boolean",
  Image = "image",
  IconGroup = "icongroup",
  Rating = "rating",
  Markdown = "markdown",
  Currency = "currency",
}

export interface BaseDataGridProps extends BaseWidgetProps {}
