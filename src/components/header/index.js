import React from "react"
import Navbar from "../navigation"

// CSS
import styles from "./header.module.css"

export default function({ menuLinks, location }) {
  return (
    <header className={styles.header}>
      <Navbar menuLinks={menuLinks} location={location}></Navbar>
    </header>
  )
}
