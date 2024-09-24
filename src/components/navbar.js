import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Grid2 } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarRef = useRef(null); // 創建一個ref來獲取AppBar的元素

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };




  const menuItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div>
      <AppBar component="nav" ref={appBarRef}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                My Website
              </Typography>
            </>
          ) : (
            <Grid2 container alignItems="center" justifyContent="space-between" size={12}>
              <Grid2 item xs={3}>
                <Typography variant="h6">
                  My Website
                </Typography>
              </Grid2>
              <Grid2 item xs={6}>
                <Grid2 container justifyContent="center" spacing={2}>
                  {menuItems.map((item, index) => (
                    <Grid2 item key={index}>
                      <Button color="inherit">{item}</Button>
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
              <Grid2 item xs={3}>
                <Button color="inherit">Login</Button>
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
