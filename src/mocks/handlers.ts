import { rest } from "msw"

export const handlers = [
  rest.post("/api/v1/resources/testConnection", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Mock Test Connection Success!",
      }),
    )
  }),
]
