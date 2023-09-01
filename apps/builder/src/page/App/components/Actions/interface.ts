export interface ConfigElementProps {
  resourceID?: string
  onBack: () => void
  onFinished: (resourceID: string) => void
}

export interface RedisLikeConfigElementProps extends ConfigElementProps {
  type: "redis" | "upstash"
}
