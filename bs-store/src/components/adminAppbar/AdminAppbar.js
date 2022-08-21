import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useUIContext } from '../../context/ui';
import { useNavigate } from "react-router-dom";
import ThemeMenu from "../theme/ThemeMenu";
import { useSelector } from "react-redux";
import CartDrawer from "../drawer/CartDrawer";
import {Badge} from '@mui/material';


const pages = ["Books", "Categories", "Authors"];
const paths = [
  "/admin/books/list",
  "/admin/categories/list",
  "admin/authors/list",
];

const AdminAppbar = () => {
  const { authItems } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
   
  const navigate = useNavigate();

  const handleCloseNavMenu = (index) => {
    setAnchorElNav(null);
    navigate(paths[index]);
  };


  const loginAndLogoutButton = authItems?.isLogin? (
    <Button
      key='logout'
      onClick={() => navigate("/")}
      sx={{ my: 2, color: "white", display: "block" }}
    >
      Logout
    </Button>
  ) : (
    <Button
      key='login'
      onClick={() => navigate("/auth/login")}
      sx={{ my: 2, color: "white", display: "block" }}
    >
      Login
    </Button>
  );

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <ImportContactsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "fantasy",
              fontWeight: 300,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Book Store
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            
            <Menu
              id='menu-appbar'
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
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(index)}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
                  
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(index)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box></Box>


          <div>{loginAndLogoutButton}</div>         
          
          {authItems?.isLogin && (
            <>
            <ThemeMenu />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open cart'>
                <CartDrawer />
              </Tooltip>
            </Box>
            </>
           
          )}        
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AdminAppbar;
