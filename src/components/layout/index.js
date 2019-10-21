import React from "react"
import Header from "../header"

// CSS
import styles from "./layout.module.css"

// fonts
import "typeface-roboto-slab"
import "typeface-ruda"

// Data
import config from "../../../data/SiteConfig"

export default function({ children }) {
  return (
    <>
      <Header menuLinks={config.menuLinks}></Header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
