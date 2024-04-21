import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import navLogo from "../assets/nav-logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo on the top left */}
      <Link to="/" className={styles.logo}>
        <img src={navLogo} alt="" />
      </Link>

      {/* Navigation Links */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" active>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Sign Up and Login Buttons */}
      <div className={styles.authButtons}>
        <Link to="/signup" className={styles.button}>
          Sign Up
        </Link>
        <Link to="/signin" className={styles.button}>
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
