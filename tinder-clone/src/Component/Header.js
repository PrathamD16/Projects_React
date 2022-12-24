import React from "react";
import "../Styles/header.css";
import MainLogo from '../Images/main_logo.png'
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from "@mui/material";

function Header() {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon fontSize="large" className="header_icon"></PersonIcon>
      </IconButton>
      <img src={MainLogo}  className="header_logo"/>
      <IconButton>
        <ForumIcon  fontSize="large" className="header_icon" />
      </IconButton>
    </div>
  );
}

export default Header;
