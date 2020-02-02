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
        title="Will Kempster | JavaScript Developer and Maker in London"
        location={location}
      />
      <section className={styles.hero_section}>
        <div>
          <h1>Hi, I'm Will Kempster.</h1>
          <p>
            I'm a{" "}
            <span className={styles.highlighted}>JavaScript Developer</span> and{" "}
            <span className={styles.highlighted}>Maker</span> in London. 🙀
          </p>
          <div className={styles.line}></div>
        </div>
        <p>
          My day job with{" "}
          <a href="https://www.talentpoint.co" target="_blank">
            Talent Point
          </a>{" "}
          is helping some of London's most interesting tech-first business
          quickly and sustainably scale their engineering teams. Here I have
          Co-founded and MC a meetup series called{" "}
          <a href="https://growable.io" target="_blank">
            Growable
          </a>{" "}
          and created a mixture of internal SPAs and public facing JAMStack
          sites using React.js.
        </p>
        <p>
          This site exists to share some of my thoughts and experiences learning
          JavaScript and making products. My end goal is to launch a successful
          online business and in the background I'm building a SaaS product with
          a friend to launch in 2020.
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
          <div>
            {articles.map(project => {
              if (project.node.frontmatter.content_type === "project") {
                return (
                  <Card
                    key={project.node.frontmatter.title}
                    title={project.node.frontmatter.title}
                    description={project.node.frontmatter.description}
                    slug={project.node.frontmatter.path}
                    date={project.node.frontmatter.date}
                  />
                )
              }
            })}
          </div>
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
