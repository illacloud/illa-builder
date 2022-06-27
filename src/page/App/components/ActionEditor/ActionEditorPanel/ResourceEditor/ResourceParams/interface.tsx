import { ParamValues } from "@/page/App/components/ActionEditor/Resource"

export interface ResourceParamsProps {
  resourceType: string
  onChange: (value: ParamValues) => void
}
