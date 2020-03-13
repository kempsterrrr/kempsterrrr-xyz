import React from "react"
import { graphql } from "gatsby"
import moment from "moment"

// Components
import Layout from "../components/layout"
import SEO from "../components/seo"

// CSS
import styles from "./article.module.css"
import lineStyles from "../pages/index.module.css"

export default function ProjectTemplate({ data, pageContext, location }) {
  const project = data.markdownRemark

  return (
    <Layout location={location}>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description}
        location={location}
      />
      <section className={styles.article}>
        <div>
          <h1>{project.frontmatter.title}</h1>
          <span>{project.frontmatter.description}</span>
          <div aria-hidden="true" className={lineStyles.line}></div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: project.html }}></div>
        <a href={project.frontmatter.project_url} target="_blank">
          Visit the project ->
        </a>
      </section>
    </Layout>
  )
}

export const projectQuery = graphql`
  query GetProjectBySlug($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        description
        date
        project_url
        content_type
      }
      html
      timeToRead
      wordCount {
        words
      }
    }
  }
`

// {moment(`${project.frontmatter.date}`).format("MMMM Do YYYY")}
