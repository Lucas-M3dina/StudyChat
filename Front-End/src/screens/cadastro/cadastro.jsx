import React from 'react'
import logo from '../../assets/logo.png'
import banner from '../../assets/banner-cadastro-fundo.png'
import img from '../../assets/undraw-cadastro.png'
import './cadastro_style.css'

import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Cadastro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      idTipoUsuario: 1, 
      nomeUsuario: '',
      email: '',
      senha: '',
      cadastroMensagem: "",
      erroMensagem: "",
      idUsuario: 0
    };
  };

  cadastrarUsuario = (event) => {
    event.preventDefault();

    this.setState({ cadastroMensagem: "", isLoading: true })

    api.post('/api/Usuarios', {
      nomeUsuario: this.state.nomeUsuario,
      idTipoUsuario: this.state.idTipoUsuario,
      email: this.state.email,
      senha: this.state.senha
    })

    // api.post('https://localhost:5000/api/Usuarios', [
    //   //validação dos dados
    //   body('username').isEmail(),
    //   body('password').isLength({ min: 5 })
    // ], (req, res) => {
    //   // caso encontre erros, ficará nessa variável errors
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }

      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-cadastro', resposta.data.token);
          this.setState({ isLoading: false });
          this.props.history.push('/');
        }
      })
      .catch(() => {
        this.setState({ erroMensagem: "Este email já está em uso, tente novamente.", isLoading: false });
      })
  }


  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
    console.log([campo.target.name] + ' : ' + campo.target.value)
  }

  limparCampos = () => {
    this.setState({
      nomeUsuario: '',
      email: '',
      senha: '',
    })
  };

  render() {
    return (
      <div className='box-body'>
        <div className="esquerda">
          <form action="submit" onSubmit={this.cadastrarUsuario}>
          <h1 className="h1-login">Cadastro</h1>

          <div className='imput-choose' >
          <button type="submit" className='btn-choose' >Professor</button>
          <button type="submit" className='btn-choose' >Aluno</button>
          </div>

            <input type="text" placeholder="Nome de Usuário"
              name='nomeUsuario'
              onChange={this.atualizaStateCampo}
              value={this.state.nomeUsuario}
            />

            <input type="text" placeholder="Série"
              name='Serie'
              onChange={this.atualizaStateCampo}
              value={this.state.nomeUsuario}
            />

            <input type="email" placeholder="Email"
              name='email'
              onChange={this.atualizaStateCampo}
              value={this.state.email}
            />

            <input type="password" placeholder="Senha"
              name='senha'
              onChange={this.atualizaStateCampo}
              value={this.state.senha}
            />

            <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

            <button type="submit" className="btn-form">Cadastrar</button>
          <div className="conta">
          <Link to="/">Já possuo conta</Link>
        </div>
          </form>
        </div>
        <div className="direita">
          
        </div>
      </div>
    );
  }
}