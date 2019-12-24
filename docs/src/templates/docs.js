import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default data => {
  const context = data.pageContext
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{context.node.name}</h1>
      <p>{context.node.description.internal.content}</p>

      <h2>Properties</h2>

      {context.node.tags
        .filter(t => t.description)
        // Alphabetize the properties
        .sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        // Create a row per prop
        .map((tag, index) => {
          let type = tag.type
            ? tag.type.type === "UnionType"
              ? `${tag.type.elements.map(e => e.name).join(" | ")}`
              : `${tag.type.name || tag.type.expression.name}`
            : ""

          if (type === "Collection") {
            type = `Collection<${tag.type.applications
              .map(a => a.name)
              .join("|")}>`
          } else
            type = (
              <a
                href={`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${type}`}
              >
                {type}
              </a>
            )

          return (
            <div key={index}>
              <h3 style={{ marginBottom: "10px" }}>.{tag.name}</h3>
              <div
                style={{
                  borderLeft: "2px solid tomato",
                  marginBottom: "20px",
                }}
              >
                <p style={{ margin: "0px", marginLeft: "5px", padding: "0px" }}>
                  {tag.description}
                </p>
                <p style={{ margin: "0px", marginLeft: "5px", padding: "0px" }}>
                  Type: {type}
                </p>
              </div>
            </div>
          )
        })}

      <h2>Methods</h2>

      {context.members
        // Alphabetize the properties
        .sort((a, b) => {
          if (a.node.name < b.node.name) return -1
          if (a.node.name > b.node.name) return 1
          return 0
        })
        // Create a row per method
        .map((member, index) => {
          const returnTag = member.node.tags.find(
            tag => tag.title === "returns"
          )

          let returns = returnTag ? returnTag.type.name : "void"

          if (returnTag && returnTag.type.name === "Promise") {
            returns = `Promise<>`
          } else if (
            returnTag &&
            returnTag.type.expression &&
            returnTag.type.expression.name === "Promise"
          ) {
            returns = `Promise<${returnTag.type.applications
              .map(
                a =>
                  a.name ||
                  (a.expression && a.expression.name) ||
                  (a.elements && a.elements.map(e => e.name).join(' | '))
              )
              .join(" | ")}>`
          }

          return (
            <div key={index}>
              <h3 style={{ marginBottom: "10px" }}>
                .{member.node.name}(
                {member.node.tags
                  .map(t => t.name)
                  // Removes those items that didn't have a valid name
                  .filter(t => t && !t.includes("."))
                  .join(", ")}
                )
              </h3>
              <div
                style={{
                  borderLeft: "2px solid tomato",
                  marginBottom: "20px",
                  marginLeft: "15px",
                  marginTop: "10px",
                }}
              >
                <p style={{ margin: "0px", marginLeft: "5px", padding: "0px" }}>
                  {member.node.description.internal.content}
                </p>
                {member.node.tags.filter(t => t.name).length ? (
                  <table style={{ marginLeft: "15px", marginTop: "10px" }}>
                    <thead>
                      <tr
                        style={{
                          borderStyle: "none",
                          backgroundColor: "tomato",
                          color: "#f7f7f7",
                        }}
                      >
                        <td
                          style={{
                            textAlign: "center",
                            borderRadius: "5px 0px 0px 0px",
                          }}
                        >
                          Parameter
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRadius: "0px 0px 0px 0px",
                          }}
                        >
                          Type
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRadius: "0px 0px 0px 0px",
                          }}
                        >
                          Optional
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRadius: "0px 0px 0px 0px",
                          }}
                        >
                          Default
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRadius: "0px 5px 0px 0px",
                          }}
                        >
                          Description
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {member.node.tags
                        // Removes empty tags
                        .filter(t => t.name)
                        .map((tag, tindex) => {
                          let type = tag.type
                            ? tag.type.type === "UnionType"
                              ? `${tag.type.elements
                                  .map(e => e.name)
                                  .join(" | ")}`
                              : `${tag.type.name || tag.type.expression.name}`
                            : ""

                          if (type === "Collection") {
                            type = `Collection<${tag.type.applications
                              .map(a => a.name)
                              .join("|")}>`
                          }
                          if (type === "null") type = undefined

                          type = (
                            <a
                              href={`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${type}`}
                            >
                              {type}
                            </a>
                          )

                          return (
                            <tr key={tindex}>
                              <td style={{ textAlign: "center" }}>
                                {tag.name}
                              </td>
                              <td style={{ textAlign: "center" }}>{type}</td>
                              <td style={{ textAlign: "center" }}>
                                {tag.type && tag.type.type === "OptionalType"
                                  ? "✅"
                                  : "❌"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {tag.default}
                              </td>
                              <td>{tag.description}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                ) : null}

                <p style={{ margin: "0px", marginLeft: "5px", padding: "0px" }}>
                  <b>Returns:</b> {returns}
                </p>
              </div>
            </div>
          )
        })}
    </Layout>
  )
}
