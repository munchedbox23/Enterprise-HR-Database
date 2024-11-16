export enum AppRoutes {
  AUTH = "authorization",
  EMPLOYEES = "employees",
  VACATIONS = "vacations",
  EVENT = "events",
  PAYROLL = "payroll",
  STAFFING = "staffing",
  ATTENDANCE = "attendance",
  DEPARTMENT = "department",
  NOT_FOUND = "*",
}

export const getRouteAuth = () => `/${AppRoutes.AUTH}`;
export const getEmployees = () => `${AppRoutes.EMPLOYEES}`;
export const getRouteNotFound = () => `${AppRoutes.NOT_FOUND}`;
export const getRouteHome = () => `/`;
export const getRouteVacations = () => `${AppRoutes.VACATIONS}`;
export const getRouteEvents = () => `${AppRoutes.EVENT}`;
export const getRoutePayroll = () => `${AppRoutes.PAYROLL}`;
export const getRouteStaffing = () => `${AppRoutes.STAFFING}`;
export const getRouteAttendance = () => `${AppRoutes.ATTENDANCE}`;
export const getRouteDepartment = () => `${AppRoutes.DEPARTMENT}`;

export const appRoutes = {
  home: getRouteHome,
  auth: getRouteAuth,
  employees: getEmployees,
  vacations: getRouteVacations,
  events: getRouteEvents,
  payroll: getRoutePayroll,
  staffing: getRouteStaffing,
  attendance: getRouteAttendance,
  department: getRouteDepartment,
  notFound: getRouteNotFound,
};
