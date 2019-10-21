import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, author }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle
          defaultDescription
          defaultAuthor
          twitterSite
        }
      }
    }
  `)

  const metaTitle = title || data.site.siteMetadata.defaultTitle
  const metaDescription =
    description || data.site.siteMetadata.defaultDescription
  const metaAuthor = author || data.site.siteMetadata.defaultAuthor
  const twitterSite = data.site.siteMetadata.twitterSite

  return (
    <Helmet
      title={title}
      meta={[
        {
          name: "title",
          content: metaTitle,
        },
        {
          name: "og:title",
          content: metaTitle,
        },
        {
          name: "description",
          content: metaDescription,
        },
        {
          name: "og:description",
          content: metaDescription,
        },
        {
          name: "author",
          content: metaAuthor,
        },
        {
          name: "og:author",
          content: metaAuthor,
        },
        {
          name: "twitter:card",
          content: metaDescription,
        },
        {
          name: "twitter:title",
          content: metaTitle,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          name: "twitter:site",
          content: twitterSite,
        },
      ]}
    ></Helmet>
  )
}

export default SEO
