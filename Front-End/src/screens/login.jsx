import React from "react";
import logo from "../assets/logo.png"
import fundo from "../assets/banner-cadastro-fundo.png"

import api from '../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../services/auth';
import { render } from "@testing-library/react";

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        senha: '',
        erroMensagem: '',
        isLoading: false
      }
    };
  
    efetuaLogin = (event) => {
      event.preventDefault();
  
      this.setState({ erroMensagem: "", isLoading: true })
  
      api.post('/api/Login', {
        email: this.state.email,
        senha: this.state.senha
      })
  
        .then(resposta => {
          if (resposta.status === 200) {
            localStorage.setItem('usuario-login', resposta.data.token);
            this.setState({ isLoading: false });
  
            switch (parseJWT().role) {
              case "1":
                this.props.history.push("/chat")
                console.log("estou logado: " + usuarioAutenticacao())
                break;
  
              case "2":
                this.props.history.push("/chat")
                console.log("estou logado: " + usuarioAutenticacao())
                break;
  
              default:
                this.props.history.push("/chat") //alterar a coisinha aqui
                break;
            }
          }
        })
        .catch(() => {
          this.setState({ erroMensagem: "Email e/ou senha inválidos!", isLoading: false });
        })
    }
  
    atualizaStateCampo = (campo) => {
      this.setState({ [campo.target.name]: campo.target.value })
      console.log([campo.target.name] + ' : ' + campo.target.value)
    }


render() 

{
    return (
      <div className="box-bodyL">
        <div className="esquerdaL">
          <img src={logo} alt="logo Darede" />
          {/* <img src={banner} className="undrawL" alt="banner cadastro" /> */}
        </div>
        <div className="direitaL">
          <h1 className='h1-login'>Login</h1>
          <form action="submit" onSubmit={this.efetuaLogin}>

            <input type="email" placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.atualizaStateCampo} />

            <input type="password" placeholder="Senha"
              name="senha"
              value={this.state.senha}
              onChange={this.atualizaStateCampo} />

            <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

            {
              this.state.isLoading === true &&
              <button type="submit" disabled className="btn-formL">Loading...</button>
            }
            {
              this.state.isLoading === false &&
              <button disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''} className="btn-formL" type="submit">Login</button>
            }
          </form>

          <div className="contaL">
            <p>Não possui uma conta?</p> <Link to="/Cadastro">Cadastre-se.</Link>
          </div>
        </div>
      </div>
    );
  }
}
