import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"

// components
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

// CSS
import styles from "./index.module.css"

const IndexPage = ({ data, location }) => {
  const articles = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO
        title="Will Kempster | Tech Recruiter and JavaScript Developer"
        location={location}
      />
      <section className={styles.hero_section}>
        <div>
          <h1>Hi, I'm Will Kempster.</h1>
          <p>
            I'm a <span className={styles.highlighted}>Tech Recruiter</span> and{" "}
            <span className={styles.highlighted}>JavaScript Developer</span> in
            London. 🙀
          </p>
          <div className={styles.line}></div>
        </div>
        <p>
          I co-founded (and MC) a meetup series,{" "}
          <a href="https://growable.io">Growable</a>, and spend about 1/3rd of
          my professional time developing at{" "}
          <a href="https://talentpoint.co">Talent Point</a>. The rest of my time
          is spent helping some of London's most interesting tech-first
          businesses quickly and sustainably scale their engineering teams.
        </p>
        <div></div>
      </section>
      <div aria-hidden="true" className={styles.line_2}></div>
      <section className={styles.articles_section}>
        <div>
          <h2>Articles</h2>
          <Link to="/articles">View All</Link>
        </div>
        <div>
          {articles.map(article => {
            if (article.node.frontmatter.content_type === "article") {
              return (
                <div key={article.node.frontmatter.title}>
                  <Link
                    to={article.node.frontmatter.path}
                    style={{ color: "black" }}
                  >
                    {article.node.frontmatter.title}
                  </Link>
                  <div className={styles.article_meta_info}>
                    <span>
                      {moment(`${article.node.frontmatter.date}`).format(
                        "MMM Do YYYY"
                      )}
                    </span>
                  </div>
                  <p>{article.node.frontmatter.description}</p>
                </div>
              )
            }
          })}
        </div>
      </section>
      <div aria-hidden="true" className={styles.line_2}></div>
      <section className={styles.projects_section}>
        <div>
          <h2>Projects</h2>
          <Link to="/projects">View All</Link>
        </div>
        <div className={styles.projects_container}>
          {articles.map(project => {
            if (project.node.frontmatter.content_type === "project") {
              return (
                <Card
                  key={project.node.frontmatter.title}
                  title={project.node.frontmatter.title}
                  description={project.node.frontmatter.description}
                  slug={project.node.frontmatter.path}
                ></Card>
              )
            }
          })}
        </div>
      </section>
      <div aria-hidden="true" className={styles.line_2}></div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
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
