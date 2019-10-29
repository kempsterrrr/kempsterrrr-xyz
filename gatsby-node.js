/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`./src/templates/article.js`)
  const projectTemplate = path.resolve(`./src/templates/project.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              content_type
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const articles = await result.data.allMarkdownRemark.edges.filter(
    item => item.node.frontmatter.content_type === "article"
  )

  const projects = await result.data.allMarkdownRemark.edges.filter(
    item => item.node.frontmatter.content_type === "project"
  )

  articles.forEach((article, index) => {
    const previous =
      index === articles.length - 1 ? null : articles[index + 1].node
    const next = index === 0 ? null : articles[index - 1].node

    createPage({
      path: `${article.node.frontmatter.path}`,
      component: articleTemplate,
      context: {
        slug: article.node.frontmatter.path,
        previous,
        next,
      },
    })
  })

  projects.forEach((project, index) => {
    const previous =
      index === projects.length - 1 ? null : projects[index + 1].node
    const next = index === 0 ? null : projects[index - 1].node

    createPage({
      path: `${project.node.frontmatter.path}`,
      component: projectTemplate,
      context: {
        slug: project.node.frontmatter.path,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `path`,
      value: node.frontmatter.path,
    })
  }
}
