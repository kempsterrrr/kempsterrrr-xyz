import React from "react"
import Header from "../header"

// CSS
import styles from "./layout.module.css"

// fonts
import "typeface-roboto-slab"
import "typeface-ruda"

// Data
import config from "../../../data/SiteConfig"

export default function({ children, location }) {
  return (
    <>
      <Header menuLinks={config.menuLinks} location={location}></Header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
