import { RJSFSchema, UiSchema } from "@rjsf/utils"
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

export interface JsonSchemaFormWidgetProps
  extends WrapperSchemaFormProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}

export interface WrapperSchemaFormProps extends BaseWidgetProps {
  JSONSchema?: RJSFSchema
  UISchema?: UiSchema
  formData?: Record<string, unknown>
  disabled?: boolean
  hiddenSubmitButton?: boolean
  submitButtonFullWidth?: boolean
  submitButtonText?: string
  themeColor?: string
  handleOnChange?: (formData: Record<string, unknown>) => void
  handleOnSubmit?: () => void
}
