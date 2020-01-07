require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.kempsterrrr.xyz/`,
    defaultTitle: `JavaScript Developer in London | Will Kempster`,
    defaultDescription: `Mostly talking JavaScript. Making products with React.js and Node.`,
    defaultAuthor: `Will Kempster`,
    defaultImage: "src/images/main-seo-image.png",
    twitterSite: "@kempsterrrr",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "./src/utils/typography",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 850,
            },
          },
          "gatsby-remark-prismjs",
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@kempsterrrr | Tech Recruiter and JavaScript Developer`,
        short_name: `@kempsterrrr`,
        lang: "en",
        start_url: `/`,
        background_color: `#fbc531`,
        theme_color: `#fbc531`,
        display: `minimal-ui`,
        icon: "./src/images/wk-logo.png",
        // icon: `ADD IN PERSONAL ICON, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        sitemap: "https://kempsterrrr.xyz/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
