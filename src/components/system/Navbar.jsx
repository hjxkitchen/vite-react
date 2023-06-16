import React, { useState, useContext } from "react";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ThemeToggle from "./ui/ThemeToggle";
import { ThemeContext } from "../../contexts/ThemeContext";
import { NavbarContainer, DrawerContainer } from "../../ThemeStyles";
import LanguageToggle from "./ui/LanguageToggle";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.backgroundColor,
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  color: theme.navbarTextColor,
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div>
      <NavbarContainer theme={theme}>
        <Toolbar>
          <NavButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </NavButton>
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <LogoutButton />
          <LanguageToggle />
          <ThemeToggle />
        </Toolbar>
      </NavbarContainer>
      {/* <Toolbar /> */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerContainer theme={theme}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
          <div style={{ flexGrow: 1 }} />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </DrawerContainer>
      </Drawer>
    </div>
  );
};

export default Navbar;
