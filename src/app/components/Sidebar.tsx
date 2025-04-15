"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import {
  House,
  FolderCode,
  Settings,
  SquareTerminal,
  ChevronDown,
  Users,
  LineChart,
  Megaphone,
} from "lucide-react";
import { clsx } from "clsx";

const Sidebar = () => {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem("sidebarMenus");
    if (stored) {
      setOpenMenus(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => pathname === path;

  const isSubmenuActive = (paths: string[]) => paths.some((path) => pathname.startsWith(path));

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img
          src="/assets/images/logo02.png"
          alt="CheCAT Logo"
          className={styles.sidebarBrand}
        />
        <div className={clsx(styles.sidebarToggler, styles.notActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={styles.sidebarBody}>
        <ul className={styles.navContent}>
          <li className={clsx(styles.navItem, styles.navCategory)}>PRINCIPAL</li>

          <li className={clsx(styles.navItem, isActive("/panel/dashboard") && styles.active)}>
            <Link href="/panel/dashboard" className={styles.navLink}>
              <House className={styles.linkIcon} />
              <span className={styles.linkTitle}>Dashboard</span>
            </Link>
          </li>

          {/* PROYECTOS */}
          <li
            className={clsx(
              styles.navItem,
              isSubmenuActive(["/panel/proyectos"]) && styles.active
            )}
          >
            <a
              className={styles.navLink}
              onClick={() => toggleMenu("proyectos")}
              aria-expanded={openMenus.proyectos}
            >
              <FolderCode className={styles.linkIcon} />
              <span className={styles.linkTitle}>Proyectos</span>
              <ChevronDown className={styles.linkArrow} />
            </a>
            {openMenus.proyectos && (
              <ul className={"nav subMenu"}>
                <li className="navItem">
                  <Link href="/panel/proyectos" className="navLink">
                    Lista de proyectos
                  </Link>
                </li>
                <li className="navItem">
                  <Link href="#" className="navLink">
                    Nuevo proyecto
                  </Link>
                </li>
                <li className="navItem">
                  <Link href="#" className="navLink">
                    Categoria
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* MARKETING */}
          <li
            className={clsx(
              styles.navItem,
              isSubmenuActive(["/panel/marketing"]) && styles.active
            )}
          >
            <a
              className={styles.navLink}
              onClick={() => toggleMenu("marketing")}
              aria-expanded={openMenus.marketing}
            >
              <Megaphone className={styles.linkIcon} />
              <span className={styles.linkTitle}>Marketing</span>
              <ChevronDown className={styles.linkArrow} />
            </a>
            {openMenus.marketing && (
              <ul className="nav subMenu">
                <li className="navItem">
                  <Link href="/panel/marketing/campanas" className="navLink">
                    Campañas
                  </Link>
                </li>
                <li className="navItem">
                  <Link href="/panel/marketing/clientes" className="navLink">
                    Clientes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* USUARIOS */}
          <li className={clsx(styles.navItem, isActive("/panel/usuarios") && styles.active)}>
            <Link href="/panel/usuarios" className={styles.navLink}>
              <Users className={styles.linkIcon} />
              <span className={styles.linkTitle}>Usuarios</span>
            </Link>
          </li>

          {/* VENTAS */}
          <li className={clsx(styles.navItem, isActive("/panel/ventas") && styles.active)}>
            <Link href="/panel/ventas" className={styles.navLink}>
              <LineChart className={styles.linkIcon} />
              <span className={styles.linkTitle}>Ventas</span>
            </Link>
          </li>

          {/* SETTINGS */}
          <li className={clsx(styles.navItem, isActive("/panel/settings") && styles.active)}>
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
