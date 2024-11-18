import { host } from "../../../routes/globalRoutes";

export const IWD_ROUTES = {
  // GET
  DEAN_PROCESSED_REQUESTS: `${host}/iwdModuleV2/api/dean-processed-requests/`,
  CREATED_REQUESTS: `${host}/iwdModuleV2/api/created-requests/`,
  AUDIT_DOCUMENTS: `${host}/iwdModuleV2/api/audit-document-view/`,
  DIRECTOR_APPROVED_REQUESTS: `${host}/iwdModuleV2/api/director-approved-requests/`,
  VIEW_BUDGET: `${host}/iwdModuleV2/api/view-budget/`,
  REJECTED_REQUESTS: `${host}/iwdModuleV2/api/rejected-requests-view/`,
  REQUESTS_IN_PROGRESS: `${host}/iwdModuleV2/api/requests-in-progress/`,
  VIEW_FILE: `${host}/iwdModuleV2/api/view-file/`,
  // POST
  CREATE_REQUESTS: `${host}/iwdModuleV2/api/create-request/`,
  ADD_BUDGET: `${host}/iwdModuleV2/api/add-budget/`,
  ISSUE_WORK_ORDER: `${host}/iwdModuleV2/api/issue-work-order/`,
  HANDLE_DIRECTOR_APPROVAL: `${host}/iwdModuleV2/api/handle-director-approval-requests/`,
  // PATCH
  EDIT_BUDGET: `${host}/iwdModuleV2/api/edit-budget/`,
  MARK_COMPLETED: `${host}/iwdModuleV2/api/work-completed/`,
  UPDATE_REQUESTS: `${host}/iwdModuleV2/api/handle-update-requests/`,
};