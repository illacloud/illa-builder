import { rest } from "msw"
import { v4 as uuidV4 } from "uuid"
import { baseUrl } from "@/mocks/config"
import { ALL_RESOURCE, SINGLE_MYSQL_RESOURCE } from "./data"

export default [
  rest.get(`${baseUrl}/resources`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(ALL_RESOURCE))
  }),

  rest.post(`${baseUrl}/resources`, (req, res, ctx) => {
    const data = req.body
    const dateStr = new Date().toISOString()

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        ...SINGLE_MYSQL_RESOURCE,
        resourceId: uuidV4(),
        ...data,
        createdAt: dateStr,
        lastModifiedAt: dateStr,
      }),
    )
  }),

  rest.put(`${baseUrl}/resources/:resourceId`, (req, res, ctx) => {
    const { resourceId } = req.params
    const data = req.body
    const dateStr = new Date().toISOString()

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        ...data,
        resourceId,
        lastModifiedAt: dateStr,
      }),
    )
  }),

  rest.delete(`${baseUrl}/resources/:resourceId`, (req, res, ctx) => {
    const { resourceId } = req.params

    return res(
      ctx.status(200),
      ctx.json({
        resourceId,
      }),
    )
  }),

  rest.post(`${baseUrl}/resources/testConnection`, (req, res, ctx) => {
    return Math.random() > 0.2
      ? res(ctx.delay(500), ctx.status(200), ctx.text("Connection success!"))
      : res(ctx.delay(1000), ctx.status(400), ctx.text("Connection fail."))
  }),
]
