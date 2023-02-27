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
  },
}
