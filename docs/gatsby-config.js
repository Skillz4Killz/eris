module.exports = {
    siteMetadata: {
        title: "Eris Documentation",
        description:
      "A Node.JS Discord Library",
        author: "abalahahaha"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/images`
            }
        },
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "gatsby-starter-default",
                short_name: "starter",
                start_url: "/",
                background_color: "#663399",
                theme_color: "#663399",
                display: "minimal-ui",
                icon: "src/images/gatsby-icon.png" // This path is relative to the root of the site.
            }
        },
        {
            resolve: "gatsby-source-jsdoc",
            options: {
                sourceDir: `${__dirname}/../lib/`
            }
        },
        "gatsby-transformer-documentationjs",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "source",
                path: `${__dirname}/../lib/`
            }
        }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    ]
};
