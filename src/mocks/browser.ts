import { setupWorker } from "msw"
import action from "./apis/action"
import resource from "./apis/resource"
import dashboard from "./apis/dashboard"
import room from "./apis/room"

const handlers = [...action, ...resource, ...dashboard, ...room]

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
