import { v4 } from "uuid"
import { ReactComponent as CarouselWidgetIcon } from "@/assets/widgetCover/carousel.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CAROUSEL_WIDGET_CONFIG: WidgetConfig = {
  type: "CAROUSEL_WIDGET",
  displayName: "carousel",
  widgetName: i18n.t("widget.carousel.name"),
  keywords: ["Carousel", "轮播"],
  icon: <CarouselWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {
    showArrows: true,
    showDots: true,
    hidden: false,
    manualData: [
      {
        id: `img-${v4()}`,
        value: "Image 1",
        url: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
      {
        id: `img-${v4()}`,
        value: "Image 2",
        url: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
      {
        id: `img-${v4()}`,
        value: "Image 3",
        url: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
    ],
    dataSources: "{{[]}}",
  },
}
