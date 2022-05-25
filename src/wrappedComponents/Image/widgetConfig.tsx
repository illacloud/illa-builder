import { ComponentModel } from "@/wrappedComponents/interface"
import { ImageIcon } from "./svg"

export const IMAGE_WIDGET_CONFIG: ComponentModel = {
  type: "IMAGE_WIDGET",
  widgetName: "image",
  version: "0.0.1",
  icon: <ImageIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    src: "https://placekitten.com/400/300",
  },
}
