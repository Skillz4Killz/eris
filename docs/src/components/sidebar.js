import React from "react"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Link } from "gatsby"

const drawerWidth = 240

export default props => (
  <div style={{ display: "flex" }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      style={{
        width: `calc(100% - ${drawerWidth - 25}px)`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          <Link to="/">Eris Documentation</Link>
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer style={{ width: drawerWidth }} variant="permanent">
      <div style={{ padding: "30px" }} />
      <Divider />
      <List>
        {props.data.map((edge, index) => (
          <Link
            to={edge.node.name}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemText primary={edge.node.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
    <main style={{ flexGrow: 1 }}>
      <div style={{ padding: "50px" }} />
      <div>{props.children}</div>
    </main>
  </div>
)
