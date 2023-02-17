import { GenIcon, IconBase, IconContext, IconManifest } from "react-icons"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface RIALL {
  IconsManifest: IconManifest[]
  GenIcon: typeof GenIcon
  IconBase: typeof IconBase
  DefaultContext: IconContext
  IconContext: React.Context<IconContext>
}

export interface IconWidgetProps
  extends BaseWidgetProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  iconName?: string
  colorScheme?: string
}
