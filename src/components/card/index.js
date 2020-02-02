import React from "react"
import { Link } from "gatsby"
import moment from "moment"

// CSS
import styles from "./card.module.css"

function Card({ title, description, slug, date }) {
  return (
    <div className={styles.card}>
      <Link to={slug}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>{moment(`${date}`).format("MMM Do YYYY")}</div>
      </Link>
    </div>
  )
}

export default Card
