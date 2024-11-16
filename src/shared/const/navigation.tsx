import type { Navigation } from "@toolpad/core/AppProvider";
import BadgeIcon from "@mui/icons-material/Badge";
import Groups2Icon from "@mui/icons-material/Groups2";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import TodayIcon from "@mui/icons-material/Today";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { appRoutes } from "./routes";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Основные таблицы",
  },
  {
    segment: "employees",
    title: "Сотрудники",
    icon: (
      <Link to={appRoutes.home()}>
        <BadgeIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.home()}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 200,
        }}
      />
    ),
  },
  {
    segment: "staffing",
    title: "Штатное расписание",
    icon: (
      <Link to={appRoutes.staffing()}>
        <Groups2Icon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.staffing()}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 200,
        }}
      />
    ),
  },
  {
    segment: "vacation",
    title: "Отпуска",
    icon: (
      <Link to={appRoutes.vacations()}>
        <AirplaneTicketIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.vacations()}
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 200,
          height: "100%",
        }}
      />
    ),
  },
  {
    segment: "hrEvent",
    title: "Кадровое событие",
    icon: (
      <Link to={appRoutes.events()}>
        <TodayIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.events()}
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 200,
          height: "100%",
        }}
      />
    ),
  },
  {
    segment: "department",
    title: "Отдел",
    icon: (
      <Link to={appRoutes.department()}>
        <ApartmentIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.department()}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 200,
        }}
      />
    ),
  },
  {
    segment: "attendance",
    title: "Учет рабочего времени",
    icon: (
      <Link to={appRoutes.attendance()}>
        <AccessTimeIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.attendance()}
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 200,
          height: "100%",
        }}
      />
    ),
  },
  {
    segment: "salaryTracking",
    title: "Табель учета заработной платы",
    icon: (
      <Link to={appRoutes.payroll()}>
        <CurrencyExchangeIcon />
      </Link>
    ),
    action: (
      <Link
        to={appRoutes.payroll()}
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 200,
          height: "100%",
        }}
      />
    ),  
  },
];
