import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Feedback,
  House,
  People,
  Person,
  PowerSettingsNew,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { generateImagePath } from "../../utils/utils";

const drawerWidth = 240;

const ToolbarSpacer = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Sidebar = styled("div")(({ theme, open }) => ({
  flexShrink: 0,
  backgroundColor: "#f5f5f5",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: open ? drawerWidth : 0,
}));

const SidebarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SidebarList = styled(List)(({ theme, open }) => ({
  marginTop: theme.spacing(2),
  position: "sticky",
  top: theme.spacing(10),
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  transform: open ? "none" : `translateX(-${drawerWidth}px)`,
}));

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const { getDpAndFullName, logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {open ? (
            <IconButton
              color="inherit"
              onClick={handleDrawerClose}
              sx={{ mr: 2 }}
            >
              <ChevronLeft />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <ChevronRight />
            </IconButton>
          )}
          <div>
            <Link to="/" style={{ color: "white" }}>
              Go Back to EzStay
            </Link>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <Typography
            variant="body1"
            sx={{ mr: 2 }}
            style={{ color: "white" }}
            component={Link}
            to={"/admin/profile"}
          >
            {getDpAndFullName().fullname}
          </Typography>
          <IconButton color="inherit" component={Link} to={"/admin/profile"}>
            <img
              src={generateImagePath(getDpAndFullName().dpPath)}
              alt="Profile"
              width="32"
              height="32"
              title={getDpAndFullName().fullName}
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="row">
        <Sidebar open={open} className="col-md-3">
          <SidebarHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </SidebarHeader>
          <SidebarList open={open}>
            <ListItem component={Link} to={"/admin/dashboard"}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to={"/admin/users"}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem component={Link} to={"/admin/properties"}>
              <ListItemIcon>
                <House />
              </ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItem>
            <ListItem component={Link} to={"/admin/feedbacks"}>
              <ListItemIcon>
                <Feedback />
              </ListItemIcon>
              <ListItemText primary="Feedback" />
            </ListItem>
            <ListItem component={Link} to={"/admin/profile"}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem onClick={logout}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </SidebarList>
        </Sidebar>
        <Content className="col-md-9">
          <ToolbarSpacer />
          {children}
        </Content>
      </div>
    </>
  );
};

export default AdminLayout;
