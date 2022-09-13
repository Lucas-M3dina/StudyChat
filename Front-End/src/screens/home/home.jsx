import React from 'react'
import logo from '../../assets/logo.png'
import astronauta from '../../assets/astronauta-home.png'
import './home_style.css'
import et from  '../../assets/et.png'

import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Cadastro extends Component {
  
  render() {
    return (
      <>
        <header className='header-Home'>
            <nav className='container-header-home'>
                <img className='logo-header' src={logo} alt="Logo" />
                <div className="nav-titulo">
                    <a className='laranja titulo' href="#">Como funciona?</a>
                    <a className='vinho titulo' href="#">Sobre nós</a>
                    <Link to="/chat" className='ciano titulo'>Chats</Link>
                </div>
            </nav>
        </header>

        <main>
            <section className="container-banner-home">
            <span className="titulo-banner-home">BEM VINDO A NOSSA PLATAFORMA</span>
            <span className="titulo-banner-home">PARA ACESSAR SEUS CHATS</span>
            <Link to="/chat" className='btn-banner-home'>CLIQUE AQUI</Link>
            </section>

            <section className="como_funciona">
                <h2 className="titulo-como_funciona">Como funciona?</h2>
                <div className="container-como_funciona">
                    <p className="texto-como_funciona">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesett </p>
                    <img className="astronauta" src={astronauta} alt="Astronauta" />
                </div>
            </section>

            <section className="nuvem-azul">
                <img className='et' src={et} alt="et" />
                <p className="texto-nuvem-azul">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
            </section>

            <section className="nuvem-amarela">
                
            </section>
        </main>
      </>
    );
  }
}