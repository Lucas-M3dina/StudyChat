import React from 'react'
import logo from '../../assets/logo.png'
import astronauta from '../../assets/astronauta-home.png'
import './home_style.css'
import et from  '../../assets/et.png'
import menino from '../../assets/menino-home.png'
import Header from '../../components/header/header'
import linked from '../../assets/logotipo-do-linkedin.png'
import git from '../../assets/github.png'
import insta from '../../assets/instagram (1).png'
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import Footer from '../../components/footer/footer.jsx'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function Home() {
  
    if (usuarioAutenticacao() ) {
      return (
        <>
          <Header item1="Como funciona?" item2="Sobre nós"/>
  
          <main className='main-home'>
              <section className="container-banner-home">
              <span className="titulo-banner-home">BEM VINDO A NOSSA PLATAFORMA</span>
              <span className="titulo-banner-home">PARA ACESSAR SEUS CHATS</span>
              <Link to={ () => {
                console.log(parseJWT());
                if (parseJWT().TipoUsuario === "1") {
                  return '/meuschats'
                }
                else{
                  return '/chat'
                }
              }} className='btn-banner-home'>CLIQUE AQUI</Link>
              </section>
  
              <section className="como_funciona">
                  <h2 className="titulo-como_funciona">Como funciona?</h2>
                  <div className="container-como_funciona">
                      <p className="texto-como_funciona">Dentro da plataforma é possível que o professor crie tarefas e as disponibilize para os estudantes, que podem remotamente fazer o acesso desta atividade e executá-las</p>
                      <img className="astronauta" src={astronauta} alt="Astronauta" />
                  </div>
              </section>
  
              <section className="nuvem-azul">
                  <img className='et' src={et} alt="et" />
                  <p className="texto-nuvem-azul">De forma interativa, o chat funciona como uma conversa na qual é enviado a pergunta e as alternativas de resposta para os alunos. Ao escolherem uma das alternativas, o software analisa os resultados de forma ágil, e retorna sua assertividade.</p>
              </section>
  
              <section className="nuvem-amarela">
                <div className="box-nuvem-amarela">
                  <h2 className="sobre"> Sobre nós</h2>
                  <p className="texto-sobre">O StudyChat SESI-SP 113 foi desenvolvido por estudantes do 3º ano do Ensino Médio pelo método Scrum, através de um projeto iniciado nas aulas da disciplina de robótica</p>
                </div>
                <img src={menino} alt="" className="menino-nuvem-amarela" />
              </section>
  
              <section className="desenvolvedores">
                <h2 className="titulo-desenvolvedores"> Conheça nossos desenvolvedores</h2>
                <div className="container-desenvolvedores">
                <div class="card card0">
                <div class="border">
                  <h2 class="AL">William Ferreira</h2>
                  <div class="icons">
                    <img src={linked} alt='linkedin' className='social'></img>
                    <img src={git} alt='github' className='social'></img>
                    <img src={insta} alt='instagram' className='social'></img>
                  </div>
                </div>
              </div>
              <div class="card card1">
                <div class="border">
                  <h2>Lucas Medina</h2>
                  <div class="icons">
                    <img src={linked} alt='linkedin' className='social'></img>
                    <img src={git} alt='github' className='social'></img>
                    <img src={insta} alt='instagram' className='social'></img>
                  </div>
                </div>
              </div>
                </div>
              </section>
          </main>
          
          <Footer/>
        </>
      );
    }
    else{
      return(
        window.location.href = '/'
      );
    }
}