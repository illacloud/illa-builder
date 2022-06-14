import { rest } from "msw"
import { baseUrl } from "@/mocks/config"
import { SIGN_UP_RESULT, SIGN_IN_RESULT } from "./data"

export default [
  rest.post(`${baseUrl}/auth/signin`, (_, res, ctx) => {
    return res(
      ctx.cookie("refresh_token", "eyJ2", { httpOnly: true, maxAge: 200 }),
      ctx.cookie("access_token", "eyJ1", { httpOnly: true, maxAge: 200 }),
      ctx.status(200),
      ctx.json(SIGN_IN_RESULT),
    )
  }),
  rest.post(`${baseUrl}/auth/signup`, (_, res, ctx) => {
    return res(
      ctx.cookie("access_token", "eyJ8", { httpOnly: true, maxAge: 200 }),
      ctx.cookie("refresh_token", "eyJ3", { httpOnly: true, maxAge: 200 }),
      ctx.status(200),
      ctx.json(SIGN_UP_RESULT),
    )
  }),
  rest.post(`${baseUrl}/auth/forgetPassword`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "change password successfully" }),
    )
  }),
  rest.post(`${baseUrl}/auth/verification`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ verificationToken: "MTAwODYxNjA=" }))
  }),
]
