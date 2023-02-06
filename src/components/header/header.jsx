import { Component } from 'react';
import { Link } from 'react-router-dom'
import Bar from '../../assets/bars.svg'
import logo from '../../assets/logo.png'
import './header.css'

export default class Header extends Component {
  
  render() {
    return (
      <>
        <header className='header-classe'>
          <nav className='container-header'>
              <Link to ="/"> <img className='logo-header' src={logo} alt="Logo" /> </Link> 
              
              <img className='img-menu' onClick={() => {
                var menu = document.getElementById("nav-bar-responsivo");
                if (menu.style.display === "flex") {
                    menu.style.display = "none"
                } else{
                    menu.style.display = "flex"
                }
              }} src={Bar} alt="botão menu" />

              <div id='nav-bar'>
                  <a className='laranja titulo-header' href="#">Como funciona?</a>
                  <a className='vinho titulo-header' href="#">Sobre nós</a>
                  <Link to="/meuschats" className='ciano titulo-header'>Chats</Link>
              </div>

              <div id='nav-bar-responsivo'>
                  <a className='laranja titulo-header' href="#">Como funciona?</a>
                  <a className='vinho titulo-header' href="#">Sobre nós</a>
                  <Link to="/meuschats" className='ciano titulo-header'>Chats</Link>
              </div> 

          </nav>
        </header>
      </>
    );
  }
}