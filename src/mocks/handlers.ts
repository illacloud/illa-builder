import { rest } from "msw"
import { v4 as uuidV4 } from "uuid"

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  rest.post(`${baseUrl}/resources/testConnection`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Mock Test Connection Success!",
      }),
    )
  }),
  rest.post(`${baseUrl}/actions/:id/run`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: "error",
        message:
          "This is the base URL of the API. Please read the https://docs.coinapi.io/ for more information on how to use the API.",
        data: {
          id: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
          ],
          email: [
            "ben@tryretool.com",
            "evaluator@tryretool.com",
            "droptable@xkcd.com",
            "louis@competitor.com",
            "tenx@tryretool.com",
            "cy@tryretool.com",
            "lem@tryretool.com",
            "roger@tryretool.com",
            "mary@tryretool.com",
            "rosemary@tryretool.com",
            "elizabeth@tryretool.com",
            "eva.noyce@tryretool.com",
            "barry@tryretool.com",
          ],
          first_name: [
            "Ben",
            "Eva",
            "Robert')",
            "Louis",
            "Alyssa P.",
            "Cy D.",
            "Lem",
            "Roger",
            "Mary",
            "Rosemary",
            "Elizabeth",
            "Eva",
            "Barry",
          ],
          last_name: [
            "Bitdiddle",
            "Lu Ator",
            "DROP TABLE Users;",
            "Reasoner",
            "Hacker",
            "Fect",
            "E. Tweakit",
            "Moore",
            "Meets",
            "Rogers",
            "Meets",
            "Noyce",
            "Bore",
          ],
          created_at: [
            "2018-12-01T00:13:12.000Z",
            "2018-12-02T01:13:12.000Z",
            "2018-12-03T02:13:12.000Z",
            "2018-12-04T03:13:12.000Z",
            "2018-12-05T04:13:12.000Z",
            "2018-12-06T05:13:12.000Z",
            "2018-12-07T06:13:12.000Z",
            "2018-12-08T07:13:12.000Z",
            "2018-12-09T08:13:12.000Z",
            "2018-12-10T09:13:12.000Z",
            "2018-12-11T10:13:12.000Z",
            "2018-12-12T11:13:12.000Z",
            "2018-12-13T12:13:12.000Z",
          ],
          updated_at: [
            "2022-05-19T03:41:52.387Z",
            "2022-05-19T03:41:52.392Z",
            "2022-05-19T03:41:52.397Z",
            "2022-05-19T03:41:52.401Z",
            "2022-05-19T03:41:52.405Z",
            "2022-05-19T03:41:52.410Z",
            "2022-05-19T03:41:52.414Z",
            "2022-05-19T03:41:52.419Z",
            "2022-05-19T03:41:52.423Z",
            "2022-05-19T03:41:52.427Z",
            "2022-05-19T03:41:52.432Z",
            "2022-05-19T03:41:52.436Z",
            "2022-05-19T03:41:52.441Z",
          ],
          active: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          feature_flags: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
          trial_expiry_date: [
            "2019-02-15",
            "2019-03-15",
            "2019-03-15",
            "2019-03-10",
            "2019-03-05",
            "2019-02-05",
            "2019-02-05",
            "2019-03-20",
            "2019-03-20",
            "2019-03-20",
            "2019-03-12",
            "2019-03-12",
            "2019-03-05",
          ],
        },
      }),
    )
  }),

  rest.post(`${baseUrl}/actions`, (req, res, ctx) => {
    const data = req.body

    return res(
      ctx.status(200),
      ctx.json({
        actionId: uuidV4(),
        ...data,
      }),
    )
  }),

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

  rest.get(`${baseUrl}/room`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        roomId: "1",
      }),
    )
  }),
]
