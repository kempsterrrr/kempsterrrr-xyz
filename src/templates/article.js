import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"

// Personal Components
import Layout from "../components/layout"
import SEO from "../components/seo"

// CSS
import styles from "./article.module.css"
import lineStyles from "../pages/index.module.css"

// Images
import rightArrowBlack from "../images/right-arrow-black.svg"
import backArrowBlack from "../images/back-arrow-black.svg"

export default function ArticleTemplate({ data, pageContext, location }) {
  const article = data.markdownRemark

  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description}
        author={article.frontmatter.author}
        location={location}
      />
      <section className={styles.article}>
        <div>
          <h1>{article.frontmatter.title}</h1>
          <span>
            {moment(`${article.frontmatter.date}`).format("MMMM Do YYYY")}
          </span>
          <div aria-hidden="true" className={lineStyles.line}></div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.html }}></div>
      </section>
      <div aria-hidden="true" className={lineStyles.line_2}></div>
      <div className={styles.div}>
        <div>
          {previous && (
            <Link to={previous.frontmatter.path} rel="prev">
              <img src={backArrowBlack} alt="Backward Arrow" />
              {previous.frontmatter.title}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={next.frontmatter.path} rel="next">
              {next.frontmatter.title}
              <img src={rightArrowBlack} alt="Forward Arrow" />
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const articleQuery = graphql`
  query GetArticleBySlug($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        description
        date
      }
      html
      timeToRead
      wordCount {
        words
      }
    }
  }
`
