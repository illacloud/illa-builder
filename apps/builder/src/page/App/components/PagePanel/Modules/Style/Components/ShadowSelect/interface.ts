import { SHADOW_VALUE } from "./constants"

export interface ShadowSetterProps {
  value: SHADOW_VALUE
  onChange: (value: SHADOW_VALUE) => void
}
