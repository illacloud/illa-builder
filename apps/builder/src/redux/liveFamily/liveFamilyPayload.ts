import { Presence } from "./liveFamilyState"

export interface AddPresencePayload {
  presence: Presence
  index?: number
}
