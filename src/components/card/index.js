import React from "react"
import { Link } from "gatsby"

// CSS
import styles from "./card.module.css"

function Card({ title, description, slug }) {
  return (
    <div className={styles.card}>
      <Link to={slug}>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </div>
  )
}

export default Card
