import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "../interface"

export const IMAGE_WIDGET_CONFIG: ComponentModel = {
  type: "IMAGE_WIDGET",
  widgetName: "image",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    src: "https://placekitten.com/400/300",
  },
}
