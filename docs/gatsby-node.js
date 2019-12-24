const path = require("path");

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    return graphql(`
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
  `).then((result) => {
        if(result.errors) {
            result.errors.forEach((e) => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        for(const edge of result.data.allDocumentationJs.edges) {
            if(!edge.node.name) {
                continue;
            }

            if(edge.node.kind !== "class") {
                continue;
            }

            const members = result.data.allDocumentationJs.edges.filter(
                (e) => e.node.memberof === edge.node.name
            );

            createPage({
                path: edge.node.name,
                component: path.resolve("src/templates/docs.js"),
                context: {
                    members: members,
                    node: edge.node,
                    allEdges: result.data.allDocumentationJs.edges
                }
            });
        }
    });
};
