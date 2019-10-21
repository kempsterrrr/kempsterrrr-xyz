import React from "react"
import Navbar from "../navigation"

// CSS
import styles from "./header.module.css"

export default function({ menuLinks }) {
  return (
    <header className={styles.header}>
      <Navbar menuLinks={menuLinks}></Navbar>
    </header>
  )
}
