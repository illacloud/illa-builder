import { v4 } from "uuid"
import CarouselWidgetIcon from "@/assets/widgetCover/carousel.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CAROUSEL_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506105524407-94b39b1e7415?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8UUZ6YlEwZ0RodlF8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"

const originData = [
  {
    id: `Image-${v4()}`,
    label: "Image 1",
    url: "https://images.unsplash.com/photo-1506105524407-94b39b1e7415?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8UUZ6YlEwZ0RodlF8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: `Image-${v4()}`,
    label: "Image 2",
    url: "https://images.unsplash.com/photo-1528074529665-982494e88f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xRRnpiUTBnRGh2UXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: `Image-${v4()}`,
    label: "Image 3",
    url: "https://images.unsplash.com/photo-1629044297557-81cbc9d05b8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8UUZ6YlEwZ0RodlF8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
]

export const CAROUSEL_WIDGET_CONFIG: WidgetConfig = {
  type: "CAROUSEL_WIDGET",
  displayName: "carousel",
  widgetName: i18n.t("widget.carousel.name"),
  keywords: ["Carousel", "轮播"],
  icon: <CarouselWidgetIcon />,
  sessionType: "PRESENTATION",
  h: 30,
  w: 20,
  version: 0,
  defaults: {
    configureMode: "static",
    radius: "0px",
    showArrows: true,
    showDots: true,
    hidden: false,
    manualData: originData,
    dataSources: `{{${JSON.stringify(originData, null, "  ")}}}`,
    interval: "{{3000}}",
    current: 0,
  },
}
