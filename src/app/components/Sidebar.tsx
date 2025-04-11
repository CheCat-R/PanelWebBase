import Link from "next/link";
import styles from "./Sidebar.module.css";
import { House, FolderCode, SquareTerminal, Settings } from 'lucide-react';
import { clsx } from 'clsx'

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
      <img src="/assets/images/logo02.png" alt="CheCAT Logo" className={styles.sidebarBrand} />
        <div className={clsx(styles.sidebarToggler, styles.notActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className={styles.sidebarBody}>
        <ul className={styles.navContent}>
          <li className={clsx(styles.navItem, styles.navCategory)}>PRINCIPAL</li>
          <li className={styles.navItem}>
            <Link href="/panel/dashboard" className={styles.navLink}>
              <House className={styles.linkIcon} />
              <span className={styles.linkTitle}>Dashboard</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/panel/proyectos" className={styles.navLink}>
              <FolderCode className={styles.linkIcon} />
              <span className={styles.linkTitle}>Proyectos</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/panel/servicios" className={styles.navLink}>
              <SquareTerminal className={styles.linkIcon} />
              <span className={styles.linkTitle}>Servicios</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/panel/settings" className={styles.navLink}>
              <Settings className={styles.linkIcon} />
              <span className={styles.linkTitle}>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
