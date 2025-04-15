"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Bell, Mail, CircleUser, User, UserPen, LogOut } from "lucide-react";

const Navbar = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Cierra los menús si hacés clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.navItem}`)) {
        setShowMessages(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <a href="#" className={styles.sidebarToggler}>
        <i data-feather="menu"></i>
      </a>
      <div className={styles.navbarContent}>
        <ul className={styles.navbarNav}>
          <li className={`${styles.navItem} ${styles.navMessage}`}>
            <a
              className={styles.navLink}
              href="#"
              id="messageDropdown"
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfile(false);
              }}
            >
              <Mail />
            </a>
            <div
              className={`${styles.dropdownMenu} ${
                showMessages ? styles.show : ""
              }`}
            >
              <div className={styles.dropdownHeader}>
                <p className={styles.fontWeightMedium}>9 New Messages</p>
                <a href="#" className={styles.textMuted}>
                  Clear all
                </a>
              </div>
              <div className={styles.dropdownBody}>
                {[
                  "Leonardo Payne",
                  "Carl Henson",
                  "Jensen Combs",
                  "Amiah Burton",
                  "Yaretzi Mayo",
                ].map((name, index) => (
                  <a key={index} href="#" className={styles.dropdownItem}>
                    <div className={styles.figure}>
                      <img src="https://via.placeholder.com/30x30" alt="user" />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.messageHeader}>
                        <p>{name}</p>
                        <p className={styles.subText}>Hace poco</p>
                      </div>
                      <p className={styles.subText}>Mensaje de prueba</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <a href="#">View all</a>
              </div>
            </div>
          </li>

          <li className={`${styles.navItem} ${styles.navNotifications}`}>
            <a
              className={styles.navLink}
              href="#"
              id="notificationDropdown"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfile(false);
              }}
            >
              <Bell />
              <div className={styles.indicator}>
                <div className={styles.circle}></div>
              </div>
            </a>
            <div
              className={`${styles.dropdownMenu} ${
                showNotifications ? styles.show : ""
              }`}
            >
              <div className={styles.dropdownHeader}>
                <p className={styles.fontWeightMedium}>6 New Notifications</p>
                <a href="#" className={styles.textMuted}>
                  Clear all
                </a>
              </div>
              <div className={styles.dropdownBody}>
                {[
                  "user-plus",
                  "gift",
                  "alert-circle",
                  "layers",
                  "download",
                ].map((icon, index) => (
                  <a key={index} href="#" className={styles.dropdownItem}>
                    <div className={styles.icon}>
                      <i data-feather={icon}></i>
                    </div>
                    <div className={styles.content}>
                      <p>Notificación {index + 1}</p>
                      <p className={styles.subText}>Hace poco</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <a href="#">View all</a>
              </div>
            </div>
          </li>

          <li className={`${styles.navItem} ${styles.navProfile}`}>
            <a
              className={styles.navLink}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMessages(false);
                setShowNotifications(false);
              }}
            >
              <CircleUser />
              <img src="https://via.placeholder.com/30x30" alt="profile" />
            </a>
            <div
              className={`${styles.dropdownMenu} ${
                showProfile ? styles.show : ""
              }`}
            >
              <div className={styles.dropdownHeaderColumn}>
                <div className={styles.figure}>
                  <img src="https://via.placeholder.com/80x80" alt="user" />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>Amiah Burton</p>
                  <p className={styles.email}>amiahburton@gmail.com</p>
                </div>
              </div>
              <div className={styles.dropdownBody}>
                <ul className={styles.profileNav}>
                  <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                      <User />
                      <span>Profile</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                    <UserPen />
                      <span>Edit Profile</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                    <LogOut />
                      <span>Log Out</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
