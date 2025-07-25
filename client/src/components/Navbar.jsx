import * as React from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import LinkIcon from "@mui/icons-material/Link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Stats", path: "/stats" }
];const settings = ["Logout"];
import persistor from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const url = useSelector((state) => state.url);
  const navigate = useNavigate();
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
  const handleRedirect =()=>{
    navigate("")
  }
  const handleLogout = () => {
    axios
      .get(url + "auth/logout", { withCredentials: true })
      .then((response) => {
        dispatch(removeUser());
        persistor.purge().then(() => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <AppBar position="static" sx={{ mb: "10vh",width:"100vw",  backgroundColor:"#00809D"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkIcon sx={{ mr: "10px", color:"#FFD700"}} />
          <Typography
            variant="h6"
            noWrap
            component=""
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FFD700",
              textDecoration: "none",
            }}
          >
            URL Shortener
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none","&:hover":"#D3AF37" } }}>
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={()=>navigate(page.path)} sx={{}}>
                  <Typography sx={{ textAlign: "center"}}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={()=>navigate(page.path)}
                sx={{ my: 2, color: "white", display: "block","&:hover":{backgroundColor:"#D3AF37"} }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ pr: 0 }}>
                <Avatar alt={user.name} src=" " />
              </IconButton>
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
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : 
          (
            <>
            <MenuItem onClick={()=>navigate("/register")}>
            <Typography >Register</Typography>
            </MenuItem>
             <MenuItem onClick={()=>navigate("/login")}>
            <Typography >Login</Typography>
            </MenuItem>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
