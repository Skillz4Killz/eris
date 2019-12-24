import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = props => (
  <Layout>
    {console.log(props)}
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your Eris Documentation.</p>
    {props.data.allDocumentationJs.edges
      .filter(e => e.node.name && e.node.kind === "class")
      // Alphabetize
      .sort((a, b) => {
        if (a.node.name < b.node.name) return -1
        if (a.node.name > b.node.name) return 1
        return 0
      })
      .map((edge, index) => (
        <div key={index}>
          <Link to={edge.node.name}>{edge.node.name}</Link>
        </div>
      ))}
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  {
    allDocumentationJs {
      edges {
        node {
          id
          abstract
          alias
          access
          async
          author
          commentNumber
          default
          copyright
          generator
          hideconstructor
          kind
          lends
          level
          license
          memberof
          name
          optional
          override
          readonly
          scope
          since
          description {
            id
            internal {
              content
              contentDigest
              description
              fieldOwners
              ignoreType
              type
            }
          }
          tags {
            default
            description
            errors
            lineNumber
            name
            title
            type {
              name
              prefix
              type
              applications {
                name
                type
                prefix
                applications {
                  name
                  type
                }
                expression {
                  name
                  type
                }
                elements {
                  applications {
                    name
                    type
                  }
                  expression {
                    name
                    type
                  }
                  type
                  name
                }
              }
              elements {
                type
                name
              }
              expression {
                prefix
                name
                type
              }
            }
          }
          children {
            id
            internal {
              content
              contentDigest
              description
              fieldOwners
              ignoreType
            }
            ... on File {
              id
              name
            }
          }
          codeLocation {
            start {
              line
              column
            }
          }
          returns {
            abstract
            access
            alias
            async
            author
            children {
              internal {
                content
                contentDigest
                description
                fieldOwners
                ignoreType
                type
              }
            }
            commentNumber
            default
            copyright
            description {
              internal {
                content
                contentDigest
                description
                ignoreType
                fieldOwners
                mediaType
                owner
                type
              }
            }
            kind
            lends
            level
            license
            memberof
            name
            optional
            override
            readonly
            scope
            since
            tags {
              default
              description
              errors
              lineNumber
              name
              title
              type {
                name
                prefix
                type
              }
            }
          }
          examples {
            caption
            description
            highlighted
            raw
          }
          docsLocation {
            start {
              column
              line
            }
          }
          internal {
            content
            contentDigest
            description
            fieldOwners
            ignoreType
            mediaType
            owner
            type
          }
          type {
            applications
            elements
            expression
            fields
            name
            params
            prefix
            result
            type
            typeDef {
              optional
            }
          }
          yields {
            id
          }
        }
      }
    }
  }
`
