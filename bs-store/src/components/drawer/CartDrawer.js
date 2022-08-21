import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { useUIContext } from '../../context/ui';
import { Avatar, Badge, Button } from '@mui/material';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  fontSize: '0.5rem',
  backgroundColor: '#efebe9'
}));

export default function CartDrawer() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false); 
  const {cart} = useUIContext();
  

  const cartContent = cart.map(item => (
    <Box key={item.id}>
      <Box display= "flex" sx={{pt:2, pb:2}} 
      alignItems= "start" justifyContent={"space-between"}>
      <Avatar src={`/books/${item.id%120}.jpg`} sx={{width:80, height:80, mr:2}}></Avatar>
      <Box display="flex" flexDirection={"column"}>
        <Typography fontSize="15px">{item.title}</Typography>
      </Box>
        <Typography fontStyle={'italic'} >
            {item.price}TL
        </Typography>
      </Box>
      <Divider></Divider>
    </Box>
  ));

  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(drawerOpen && { display: 'none' }) }}
          >
            <Badge badgeContent={cart && cart.length}>
              <ShoppingCartOutlinedIcon />
            </Badge>
      </IconButton>
      <Main open={drawerOpen}>
        <DrawerHeader />
        
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#efebe9',
            borderRadius: '0px 0px 0px 100px'
          },
        }}
        variant="persistent"
        anchor="right"
        open={drawerOpen}        
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <h1>Your Cart</h1>
        </DrawerHeader>
        <Divider />
        <List>
          {cartContent}
        </List>
        <Button variant='contained' sx={{marginLeft:7, marginRight:7, mt:2}}>
          Proceed to Payment
          <PaymentOutlinedIcon/>
        </Button>
        
      </Drawer>
    </Box>
  );
}
