import React from "react"
import { Link } from "gatsby"

// Peronsal components
import Layout from "../components/layout"
import SEO from "../components/seo"

// CSS
import styles from "./404.module.css"

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO location={location} title="404" />
    <section className={styles.four04}>
      <div>
        <h1>
          <span role="img" aria-label="Scared Cat">
            🙀
          </span>
        </h1>
        <p>
          "I knew a Tech Recruiter who claimed they are a JavaScript Developer
          couldn't build a website that actually worked..."
        </p>
        <Link to="/">Go Home</Link>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
