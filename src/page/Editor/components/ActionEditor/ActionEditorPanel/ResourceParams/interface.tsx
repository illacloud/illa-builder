import { ParamValues } from "@/page/Editor/components/ActionEditor/Resource"

export interface ResourceParamsProps {
  resourceType: string
  onChange: (value: ParamValues) => void
}
