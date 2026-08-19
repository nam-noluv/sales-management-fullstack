import DashboardClient from "./features/dashboard/components/dashboardClient";

export const metadata = {
  title: 'Sales Manager',
  description: 'Trang chủ hệ thống Sales Manager',
};

export default function HomePage() {
  return <DashboardClient />;
}