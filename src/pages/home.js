import React, { useState,  } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Grid2 } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home = () => {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));




  return (
    <>
     <p>lorem</p>
    </>
  );
};

export default Home;
