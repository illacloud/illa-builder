import { BaseConfigElementProps } from "../interface"

export interface MysqlLikeConfigElementProps extends BaseConfigElementProps {
  resourceType:
    | "supabasedb"
    | "tidb"
    | "mariadb"
    | "mysql"
    | "hydra"
    | "postgresql"
}
