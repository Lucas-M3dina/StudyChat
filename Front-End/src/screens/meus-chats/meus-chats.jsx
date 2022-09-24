import React from "react";
import css from "./meus-chats.css"
import api from '../../services/api'
import Logo from '../../assets/logo.png'
import LinhaEsquerda from '../../assets/linha-esquerda.png'
import LinhaDireita from '../../assets/linha-direita.png'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import { render } from "@testing-library/react";

export default class MeusChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  };

  


  render() {
    return (
      <>
        <header className="header-meusChats">
           <Link to="/home"> <img src={Logo} alt="Logo" className="logo-header" /> </Link> 
        </header>

        <main className="main-meusChats">
            <section className="container-titulo">
                <img src={LinhaEsquerda} alt="linha Esquerda decorativa" className="linha" />
                <h1 className="titulo">Meus Chats</h1>
                <img src={LinhaDireita} alt="Linha Direita decorativa" className="linha" />
            </section>

            <section className="container-card">
                <div className="card-lp card-config">
                    <h2 className="titulo-materia">Linguagem</h2>
                    <span className="questao">Questões:</span>
                    <span className="quantidadeQuestoes">10</span>
                    <Link className="btn-comecar">COMEÇAR</Link>
                </div>

                <div className="card-mat card-config">
                    <h2 className="titulo-materia">Matematica</h2>
                    <span className="questao">Questões:</span>
                    <span className="quantidadeQuestoes">10</span>
                    <Link className="btn-comecar">COMEÇAR</Link>
                </div>

                <div className="card-cien card-config">
                    <h2 className="titulo-materia">Ciências</h2>
                    <span className="questao">Questões:</span>
                    <span className="quantidadeQuestoes">10</span>
                    <Link className="btn-comecar">COMEÇAR</Link>
                </div>

                <div className="card-artes card-config">
                    <h2 className="titulo-materia">Artes</h2>
                    <span className="questao">Questões:</span>
                    <span className="quantidadeQuestoes">10</span>
                    <Link className="btn-comecar">COMEÇAR</Link>
                </div>

            </section>
        </main>

      </>
    );
  }
}
