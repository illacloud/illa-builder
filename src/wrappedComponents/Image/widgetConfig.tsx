import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "Image",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  h: 100,
  w: 100,
  defaults: {
    src: "https://placekitten.com/400/300",
  },
}
