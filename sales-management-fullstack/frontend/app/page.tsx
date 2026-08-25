import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sales Manager',
  description: 'Trang chủ hệ thống Sales Manager',
};

export default function HomePage() {
  redirect('/admin/dashboard');
}