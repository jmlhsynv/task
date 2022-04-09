import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { getLocalItems } from "../store/cart/cart";

import { Link as RouterLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../store/auth";
import { getUser } from "../store/user/user";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser())
    dispatch(getLocalItems());
  }, []);
  
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const admin = useSelector(state => state.user.user)
  const { localItems } = useSelector((state) => state.cart);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const logOut = () => {
    dispatch(logout());
    history.push("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ["login", "register"];

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    component={RouterLink}
                    to="/"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link component={RouterLink} to="/" style={{ color: "white" }}>
                Home
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link component={RouterLink} to="/cart" style={{ color: "white" }}>
              <IconButton aria-label="cart" sx={{ mr: 2 }}>
                <StyledBadge
                  badgeContent={user ? cart.length : localItems}
                  style={{ color: "white" }}
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar>
                    <DashboardIcon />
                  </Avatar>
                ) : (
                  <Avatar>
                    <LoginIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <Box>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        component={RouterLink}
                        style={{
                          textDecoration: "none",
                          textTransform: "capitalize",
                        }}
                        to={`/profile`}
                      >
                        Profile
                      </Link>
                    </Typography>
                  </MenuItem>
                  {admin.isAdmin ? (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          component={RouterLink}
                          style={{
                            textDecoration: "none",
                            textTransform: "capitalize",
                          }}
                          to={`/admin`}
                        >
                          Admin
                        </Link>
                      </Typography>
                    </MenuItem>
                  ) : (
                    ""
                  )}

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link onClick={() => logOut()}>Logout</Link>
                    </Typography>
                  </MenuItem>
                </Box>
              ) : (
                pages.map((page, key) => (
                  <MenuItem onClick={handleCloseUserMenu} key={key}>
                    <Typography textAlign="center">
                      <Link
                        component={RouterLink}
                        style={{
                          textDecoration: "none",
                          textTransform: "capitalize",
                        }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
