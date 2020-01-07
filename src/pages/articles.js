import React from "react"
import { graphql, Link } from "gatsby"

// Components
import Layout from "../components/layout"
import SEO from "../components/seo"

// CSS
import styles from "../pages/index.module.css"

export default function Articles({ data, location }) {
  const articles = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO
        title="Articles"
        description="Articles and blog posts. Mostly focused on JavaScript, mostly front-end."
        location={location}
      />
      <section className={styles.articles_section}>
        <div>
          <h1>Articles</h1>
        </div>
        <div aria-hidden="true" className={styles.line}></div>
        <div>
          {articles.map(article => {
            if (article.node.frontmatter.content_type === "article") {
              return (
                <div>
                  <Link to={article.node.frontmatter.path}>
                    <h2>{article.node.frontmatter.title}</h2>
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </section>
      <div aria-hidden="true" className={styles.line_2}></div>
    </Layout>
  )
}

export const query = graphql`
  query GetArticle {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            path
            content_type
          }
        }
      }
    }
  }
`
