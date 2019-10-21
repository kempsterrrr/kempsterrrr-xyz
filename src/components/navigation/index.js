import React from "react"
import { Link } from "gatsby"

// CSS
import styles from "./navigation.module.css"

export default function Navigation({ menuLinks }) {
  return (
    <nav className={styles.main_nav}>
      <Link to="/">
        <h1>WK</h1>
      </Link>
    </nav>
  )
}
