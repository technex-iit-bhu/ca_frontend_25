import Dashboard from '@/components/dashboard/dashboard';
import ContactSection from './components/homepage_3';
import styles from './page.module.css';
import { Navbar } from '@/components/transparent-navbar-with-logo';

export default function Home() {
  return (
    <>
      <Navbar />
      <Dashboard user={{ name: 'Shivansh ', rank: 345 }} />
    </>
  );
}
