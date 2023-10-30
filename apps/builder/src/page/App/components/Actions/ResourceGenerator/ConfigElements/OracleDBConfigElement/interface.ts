import { BaseConfigElementProps } from "../interface"

export interface OracleDBConfigElementProps extends BaseConfigElementProps {
  resourceType: "oracle" | "oracle9i"
}
