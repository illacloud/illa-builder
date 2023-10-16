import { BaseConfigElementProps } from "../interface"

export interface RedisLikeConfigElementProps extends BaseConfigElementProps {
  resourceType: "redis" | "upstash"
}
