import { v4 } from "uuid"

export const generateEventItemId = () => `events-${v4()}`

export const generateNewEventItem = (event: string, targetId?: string) => {
  return {
    id: generateEventItemId(),
    eventType: event,
    targetId,
    type: "datasource",
    method: "trigger",
  }
}
