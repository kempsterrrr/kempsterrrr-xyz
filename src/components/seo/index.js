import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, author, location, seoImage }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          defaultTitle
          defaultDescription
          defaultAuthor
          twitterSite
        }
      }
      defaultImage: file(relativePath: { eq: "main-seo-image.png" }) {
        childImageSharp {
          fixed(width: 600) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const metaTitle = title || data.site.siteMetadata.defaultTitle
  const metaDescription =
    description || data.site.siteMetadata.defaultDescription
  const metaType = location.pathname.includes("article")
    ? "article"
    : location.pathname.includes("project")
    ? "article"
    : "website"
  const metaAuthor = author || data.site.siteMetadata.defaultAuthor
  const twitterSite = data.site.siteMetadata.twitterSite
  const metaImage = `${data.site.siteMetadata.siteUrl}${seoImage ||
    data.defaultImage.childImageSharp.fixed.src}`

  return (
    <Helmet
      title={title}
      titleTemplate={`%s${location.pathname === "/" ? "" : " | Will Kempster"}`}
      meta={[
        {
          name: "title",
          content: metaTitle,
        },
        {
          property: "og:title",
          content: metaTitle,
        },
        {
          property: "og:type",
          content: metaType,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          name: "author",
          content: metaAuthor,
        },
        {
          property: "og:author",
          content: metaAuthor,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
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
        {
          name: "twitter:image",
          content: metaImage,
        },
      ]}
    />
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.object.isRequired,
  seoImage: PropTypes.string,
}

export default SEO
