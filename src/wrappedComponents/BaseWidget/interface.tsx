import { HTMLAttributes } from "react"

export interface BaseProps {
  id: string;
  type: string;
  widgetName: string;
  parentId?: string;
  version: number;
  // WidgetPosition
  leftColumn: number;
  rightColumn: number;
  topRow: number;
  bottomRow: number;
  parentColumnSpace: number;
  parentRowSpace: number;
  //
  isVisible?: boolean;
  isLoading: boolean;
  isDisabled?: boolean;
  backgroundColor?: string;
  animateLoading?: boolean;
}

export type WidgetProps = HTMLAttributes<HTMLDivElement> & BaseProps

export interface DSLWidget extends BaseProps {
  children?: DSLWidget[];
}

export interface BaseWidgetProps extends WidgetProps {
  readonly dslKey: string
  dragDisabled?: boolean
  //
}
