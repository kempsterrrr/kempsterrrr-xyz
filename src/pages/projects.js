import React from "react"

// Components
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

// CSS
import styles from "./index.module.css"
import { graphql } from "gatsby"

export default function Projects({ data, location }) {
  const projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO
        title="Projects"
        description="A snapshot of some of my projects. Mostly JavaScript, mostly on the front-end."
        location={location}
      />
      <section className={styles.projects_container}>
        <div>
          <h1>Projects</h1>
          <p>
            A snapshot of my projects. Mostly JavaScript, mostly on the
            front-end.
          </p>
        </div>
        <div aria-hidden="true" className={styles.line}></div>
        <div>
          {projects.map(project => {
            return (
              <Card
                title={project.node.frontmatter.title}
                description={project.node.frontmatter.description}
                slug={project.node.frontmatter.path}
                date={project.node.frontmatter.date}
              />
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export const getProjects = graphql`
  query getProject {
    allMarkdownRemark(
      filter: { frontmatter: { content_type: { eq: "project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            content_type
            title
            path
            description
            date
          }
        }
      }
    }
  }
`
