import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid2,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Carousel from "../components/carousel";
import styled from "styled-components";
import imagerose1920 from "../assets/rose1920.jpg";
import image90952 from "../assets/90952.webp";

const BackgroundDiv = styled.div`
  background-image: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.5) 0 40%,
      rgba(255, 0, 101, 0.3) 40% 100%
    ),
    url("${imagerose1920}");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: relative;
   
  @media (max-width: 476px) {
    height: 60vh;
  }
`;
const StyledBox = styled.div`
  position: relative;
  text-align: center;
  background-color: #cad2d8;
  padding: 20px;
  width: max-content;
  margin-inline: auto;
  margin-bottom: 20px;
  border-radius: 15px;  /* 主元素的圓角 */
  overflow: hidden;
  font-size:36px;
  font-weight:900;
  letter-spacing:25px;
  color:white;
  @media (max-width:768px) {
  margin-inline: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 20px solid transparent;
    border-image: url(${image90952}) 300 repeat;
    border-radius: inherit;  /* 偽元素的圓角 */
    pointer-events: none;   /* 確保偽元素不會影響內容的交互 */
  }

  
`;
const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid2>
        <BackgroundDiv className="container">
          <Typography
            variant="h2"
            color="white"
            sx={{
              position: "absolute",
              top: { xs: "50px", sm: "80px", md: "100px" },
              left: { xs: "20px", sm: "30px", md: "50px" },
              fontweight: "900",
              letterSpacing: "5px",
            }}
          >
            卓越領先超越未來科技
          </Typography>
          <Typography
            variant="h5"
            color="black"
            sx={{
              backgroundColor: "red",
              position: "absolute",
              top: { xs: "220px", sm: "220px", md: "200px" },
              left: { xs: "20px", sm: "30px", md: "50px" },
              fontweight: "900",
              letterSpacing: "2px",
              maxWidth: "450px",
            }}
          >
            肯定自我，一般來說，如果仔細思考未來，會發現其中蘊含的深遠意義。
          </Typography>
          <Grid2
            container
            spacing={0}
            sx={{
              position: "absolute",
              top: { xs: "400px", sm: "350px", md: "300px" },
              left: { xs: "20px", sm: "30px", md: "50px" },
            }}
          >
            <Button
              variant="text"
        
              sx={{
                color:'white',
                border:'5px solid brown',
                borderRadius:'15px',
                backgroundColor: " #201104",
                minWidth: "200px",
                fontweight: "900",
                fontSize: { xs: "16px", md: "18px" },
              }}
            >
              了解更多
            </Button>
            <Button
              variant="text"
              
              sx={{
                color:'white',
                border:'5px solid #e551a2',
                borderRadius:'15px',
                backgroundColor: " #201104",
                
                minWidth: "200px",
                marginLeft: { xs: "10px", sm: "40px" },
               
                fontweight: "900",
                fontSize: { xs: "16px", md: "18px" },
              }}
            >
              深入了解
            </Button>
          </Grid2>
        </BackgroundDiv>
      </Grid2>
      <section>
        <StyledBox >
星空鑑賞
        </StyledBox>
        <Carousel></Carousel>
      </section>
    </>
  );
};

export default Home;
