import { rest } from "msw"
import { baseUrl } from "@/mocks/config"

export default [
  rest.get(`${baseUrl}/dashboard/apps`, (req, res, ctx) => {
    const headers = req.headers
    const url = req.url
    return res(
      ctx.status(200),
      ctx.json([
        {
          appId: "1",
          appName: "Test App 1",
          appActivity: "activity",
        },
        {
          appId: "2",
          appName: "Test App 2",
          appActivity: "activity2",
        },
      ]),
    )
  }),

  rest.post(`${baseUrl}/dashboard/apps`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        appId: "1",
        appName: "Test App 1",
        appActivity: "activity",
      }),
    )
  }),
]
