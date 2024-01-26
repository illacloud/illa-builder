export const FEATURE_CONFIG = [
  {
    label: "billing.modal.upgrade_now_admin.add_unlimited_viewer",
  },
  {
    label: "billing.modal.upgrade_now_admin.publish_public_appli",
  },
  {
    label: "billing.apps.sql",
    tip: "billing.tips.sql",
  },
  {
    label: "billing.modal.upgrade_now_admin.audit_logs",
  },
]

// this keys not equal to success modal keys
export const UPGRADE_MODAL_CONFIG_KEY = {
  "add-license": {
    title: "billing.modal.upgrade_now_admin.insufficient_license_title",
    description:
      "billing.modal.upgrade_now_admin.insufficient_license_description",
    buttonText: "billing.modal.upgrade_now_admin.insufficient_license_button",
  },
  upgrade: {
    title: "billing.modal.upgrade_now_admin.upgrade_to_plus",
    description: "billing.modal.upgrade_now_admin.this_feature_is_avai",
    buttonText: "billing.modal.upgrade_now_admin.upgrade",
  },
  agent: {
    title: "billing.modal.upgrade_now_admin.upgrade_to_plus",
    description: "billing.modal.ai-agent.string2",
    buttonText: "billing.modal.upgrade_now_admin.upgrade",
  },
}
export const UPGRADE_MODAL_CONFIG_KEYS = Object.keys(UPGRADE_MODAL_CONFIG_KEY)
