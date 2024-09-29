import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Grid2 } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import imageUrl from '../assets/90952.webp';
import {  useAuth } from '../hooks/use-auth'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarRef = useRef(null); // 創建一個ref來獲取AppBar的元素
  const { auth, setAuth, handleLogin, handleLogout } = useAuth()
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };




  const menuItems = ['home', 'todolist', 'map'];

  return (
    <div>
      <AppBar component="nav" >
        <Toolbar sx={{backgroundColor:"purple"}}>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}  >
                緋紅薔薇
              </Typography>
            </>
          ) : (
            <Grid2 container alignItems="center" justifyContent="space-between" size={12}>
              <Grid2 item xs={3}>
                <Typography variant="h6" sx={{fontWeight: 'bold',color:'white',fontSize:'26px',textShadow:'3px 3px 3px black'}}>
                緋紅薔薇
                </Typography>
              </Grid2>
              <Grid2 item xs={6}>
                <Grid2 container justifyContent="center" spacing={2}>
                  {menuItems.map((item, index) => (
                    <Grid2 item key={index}>
                      <Button color="inherit" sx={{border:'5px solid silver',backgroundColor:'red',marginInline:'2.5px',paddingInline:'20px',borderRadius:'10px',textShadow:'2px 0px 1px black',
                        '&:hover':{backgroundColor:'violet',color:'gold',border:'5px solid gold'}}} onClick={() => navigate(`/${item}`)} >{item}</Button>
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
              <Grid2 item xs={3}>
                {
                  !auth.isAuth?   (           <Button color="inherit"  onClick={() => navigate('/login')}>Login</Button>): (  <><Box sx={{width:'100%',textAlign:'center'}}>您好{auth. userData.name}</Box>
                    <Button color="inherit" sx={{paddingLeft:{xs:'0',sm:'15px'}}} onClick={handleLogout}>Logout</Button></>    )
                }
   
                
         
              </Grid2>
            </Grid2>
          )}
        </Toolbar>
      </AppBar>

 
   

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: '250px' }}
        >
          <Box style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
