import { rest } from "msw"
import { baseUrl } from "@/mocks/config"

export default [
  rest.get(`${baseUrl}/room`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        roomId: "1",
      }),
    )
  }),
]
