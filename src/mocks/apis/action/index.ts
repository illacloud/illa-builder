import { rest } from "msw"
import { v4 as uuidV4 } from "uuid"
import { baseUrl } from "@/mocks/config"
import { ACTION_RUN_RESULT } from "./data"

export default [
  rest.post(`${baseUrl}/actions/:id/run`, (req, res, ctx) => {
    return res(
      ctx.delay(10000 * Math.random()),
      ctx.status(200),
      ctx.json(ACTION_RUN_RESULT),
    )
  }),

  rest.post(`${baseUrl}/actions`, (req, res, ctx) => {
    const data = req.body

    return res(
      ctx.delay(Math.random() * 3000),
      ctx.status(200),
      ctx.json({
        actionId: uuidV4(),
        ...data,
      }),
    )
  }),
]
