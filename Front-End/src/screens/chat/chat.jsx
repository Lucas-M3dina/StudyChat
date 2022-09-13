import React from "react";
import logo from '../../assets/logo.png'
import icon from '../../assets/bot-icone.png'
import butao from '../../assets/aviao-icone.png'

import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from "react-dom";

export default class Chat extends Component{

render()
{
    return(

<div id='bodybox'>
  <div id='chatborder'>
    <p id="chatlog7" class="chatlog">&nbsp;</p>
    <p id="chatlog6" class="chatlog">&nbsp;</p>
    <p id="chatlog5" class="chatlog">&nbsp;</p>
    <p id="chatlog4" class="chatlog">&nbsp;</p>
    <p id="chatlog3" class="chatlog">&nbsp;</p>
    <p id="chatlog2" class="chatlog">&nbsp;</p>
    <p id="chatlog1" class="chatlog">&nbsp;</p>
    <input type="text" name="chat" id="chatbox" placeholder="Hi there! Type here to talk to me." onfocus="placeHolder()"/>
  </div>
  <h2>Build a Chatbot</h2>
  <p>Write a program that responds to the user's text input.</p>
  </div>
    )
}
}


















