import React from "react";
import Chatbot from "react-chatbot-kit";
import Config from "../components/chatbox/Config";
import MessageParser from "../components/chatbox/MessageParser";
import ActionProvider from "../components/chatbox/ActionProvider";
import Paper from "@mui/material/Paper";
import "../css/chatbox.css";


export default function Chatbox() {
  return (
    <>
      <h1>Chatbox</h1>
      <Paper className="background">
          <Chatbot 
            config={Config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
      </Paper>        
    </>

  );
}