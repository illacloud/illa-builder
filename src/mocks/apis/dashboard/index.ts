import { rest } from "msw"
import { baseUrl } from "@/mocks/config"

export default [
  rest.get(`${baseUrl}/apps`, (req, res, ctx) => {
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
        {
          appId: "1f221b62-568b-448c-989e-d3a376273134",
          appName: "illa example app",
          currentVersionId: "450ca3c2-38ff-4f27-a1f7-3e71452f49cd",
          lastModifiedBy: "Zhanjiao Deng",
          lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
        },
      ]),
    )
  }),
  rest.post(`${baseUrl}/apps`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        appId: "1f221b62-568b-448c-989e-d3a376273134",
        appName: "Untitled app",
        currentVersionId: "450ca3c2-38ff-4f27-a1f7-3e71452f49cd",
        lastModifiedBy: "Zhanjiao Deng",
        lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
      }),
    )
  }),

  rest.put(`${baseUrl}/apps/:appId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        appId: "1f221b62-568b-448c-989e-d3a376273134",
        appName: "Illa example app",
        currentVersionId: "450ca3c2-38ff-4f27-a1f7-3e71452f49cd",
        lastModifiedBy: "Zhanjiao Deng",
        lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
      }),
    )
  }),
  rest.post(`${baseUrl}/apps/:appId/duplicate`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        appId: "621f221b-598b-8c68-449e-273134d3a376",
        appName: "Illa example app",
        currentVersionId: "3c2450ca-a1f7-4752-38ff-3e714f2f49cd",
        lastModifiedBy: "Zhanjiao Deng",
        lastModifiedAt: "2022-06-06T14:00:30.780+00:00",
      }),
    )
  }),

  rest.delete(`${baseUrl}/apps/:appId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        appId: "1f221b62-568b-448c-989e-d3a376273134",
      }),
    )
  }),

  rest.patch(`${baseUrl}/users/username`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: "04813000-438f-468e-a8c1-d34518b6c2fa",
        userName: "Zhanjiao Deng",
        email: "dengzhanjiao@illasoft.com",
        createdAt: "2022-06-06T12:00:30.780+00:00",
      }),
    )
  }),
]
