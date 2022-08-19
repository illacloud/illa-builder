import { TextWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const TABLE_WIDGET_CONFIG: WidgetConfig = {
  displayName: "table",
  widgetName: i18n.t("widget.table.name"),
  h: 5,
  w: 12,
  type: "TABLE_WIDGET",
  icon: <TextWidgetIcon size="100%" />,
  keywords: ["Table", "表格"],
  sessionType: "PRESENTATION",
  defaults: {
    originData:
      "{{[\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-01T00:13:12.000Z",\n' +
      '        "email": "ben@tryretool.com",\n' +
      '        "id": "1",\n' +
      '        "name": "Ben Bitdiddle",\n' +
      '        "trial_expiry_date": "2022-03-04",\n' +
      '        "updated_at": "2021-11-10T03:12:07.421Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "true",\n' +
      '        "created_at": "2018-12-02T01:13:12.000Z",\n' +
      '        "email": "evaluator@tryretool.com",\n' +
      '        "id": "2",\n' +
      '        "name": "Eva Lu Ator",\n' +
      '        "trial_expiry_date": "2019-03-15",\n' +
      '        "updated_at": "2022-02-28T08:30:02.883Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-03T02:13:12.000Z",\n' +
      '        "email": "droptable@xkcd.com",\n' +
      '        "id": "3",\n' +
      '        "name": "Robert\') DROP TABLE Users;",\n' +
      '        "trial_expiry_date": "2019-03-15",\n' +
      '        "updated_at": "2021-11-10T03:12:07.436Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-04T03:13:12.000Z",\n' +
      '        "email": "louis@competitor.com",\n' +
      '        "id": "4",\n' +
      '        "name": "Louis Reasoner",\n' +
      '        "trial_expiry_date": "2019-03-10",\n' +
      '        "updated_at": "2021-11-10T03:12:07.452Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-05T04:13:12.000Z",\n' +
      '        "email": "tenx@tryretool.com",\n' +
      '        "id": "5",\n' +
      '        "name": "Alyssa P. Hacker",\n' +
      '        "trial_expiry_date": "2019-03-05",\n' +
      '        "updated_at": "2021-11-10T03:12:07.472Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-06T05:13:12.000Z",\n' +
      '        "email": "cy@tryretool.com",\n' +
      '        "id": "6",\n' +
      '        "name": "Cy D. Fect",\n' +
      '        "trial_expiry_date": "2019-02-05",\n' +
      '        "updated_at": "2021-11-10T03:12:07.492Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-07T06:13:12.000Z",\n' +
      '        "email": "lem@tryretool.com",\n' +
      '        "id": "7",\n' +
      '        "name": "Lem E. Tweakit",\n' +
      '        "trial_expiry_date": "2019-02-05",\n' +
      '        "updated_at": "2021-11-10T03:12:07.512Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-08T07:13:12.000Z",\n' +
      '        "email": "roger@tryretool.com",\n' +
      '        "id": "8",\n' +
      '        "name": "Roger Moore",\n' +
      '        "trial_expiry_date": "2019-03-20",\n' +
      '        "updated_at": "2021-11-10T03:12:07.532Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-09T08:13:12.000Z",\n' +
      '        "email": "mary@tryretool.com",\n' +
      '        "id": "9",\n' +
      '        "name": "Mary Meets",\n' +
      '        "trial_expiry_date": "2019-03-20",\n' +
      '        "updated_at": "2021-11-10T03:12:07.552Z"\n' +
      "    },\n" +
      "    {\n" +
      '        "active": "false",\n' +
      '        "created_at": "2018-12-10T09:13:12.000Z",\n' +
      '        "email": "rosemary@tryretool.com",\n' +
      '        "id": "10",\n' +
      '        "name": "Rosemary Rogers",\n' +
      '        "trial_expiry_date": "2019-03-20",\n' +
      '        "updated_at": "2021-11-10T03:12:07.572Z"\n' +
      "    }\n" +
      "]}}",
  },
}
