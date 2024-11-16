import type { Navigation } from "@toolpad/core/AppProvider";
import BadgeIcon from "@mui/icons-material/Badge";
import Groups2Icon from "@mui/icons-material/Groups2";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import TodayIcon from "@mui/icons-material/Today";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Основные таблицы",
  },
  {
    segment: "employees",
    title: "Сотрудники",
    icon: <BadgeIcon />,
  },
  {
    segment: "staffing",
    title: "Штатное расписание",
    icon: <Groups2Icon />,
  },
  {
    segment: "vacation",
    title: "Отпуска",
    icon: <AirplaneTicketIcon />,
  },
  {
    segment: "hrEvent",
    title: "Кадровое событие",
    icon: <TodayIcon />,
  },
  {
    segment: "department",
    title: "Отдел",
    icon: <ApartmentIcon />,
  },
  {
    segment: "timeTracking",
    title: "Учет рабочего времени",
    icon: <AccessTimeIcon />,
  },
  {
    segment: "salaryTracking",
    title: "Табель учета заработной платы",
    icon: <CurrencyExchangeIcon />,
  },
];
