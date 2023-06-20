export interface ConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}

export interface RedisLikeConfigElementProps extends ConfigElementProps {
  type: "redis" | "upstash"
}
