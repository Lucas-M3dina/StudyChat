import React, { useState, useEffect} from "react";
import css from './chat.css'
import logo from '../../assets/logo.png'
import api from '../../services/api'
import '../home//home_style.css'
import { Link } from 'react-router-dom'

import Bar from '../../assets/bars.svg'


export default function Chat() {
  const [materia, setMateria] = useState('');
  const [questao, setQuestao] = useState(0);
  const [idSerie, setIdSerie] = useState(0);
  const [questoes, setQuestoes] = useState([]);
  const [questionarios, setQuestionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  

  function ListaQuestoesQuestionario(q){


    api.get('api/questoes/' + q.idQuestionario)

      .then(resposta => {
        if (resposta.status === 200) {
          setQuestoes(resposta.data)
          console.log(questoes);
          console.log(questao);
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  function mostrarquest(){
    var containerMsg = document.getElementById('mensagens');

    if (questoes.length >= questao) {
      var numero = questao - 1          
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="enunciado">' + questao + ' - ' + questoes[numero].enunciado + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa"> <b> A) </b> ' + questoes[numero].alternativaA + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa" ><b> B) </b>' + questoes[numero].alternativaB + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa" ><b> C) </b>' + questoes[numero].alternativaC + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa"><b> D) </b>' + questoes[numero].alternativaD + '</p>'
    }else{
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="resultado"> Formulario respondido</p>'
    }    
  }

  function salvarQuestionarios(){

    const token = {
      headers: {
         Authorization: "Bearer " + localStorage.getItem('usuario-login')
      }
   }

    api.get('api/questionarios', token)

      .then(resposta => {
        if (resposta.status === 200) {
          setQuestionarios(resposta.data)
          console.log(questionarios);
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  useEffect(() => {
    salvarQuestionarios();
    document.getElementById('form').addEventListener('submit', () => {
      questao = questao + 1
      console.log(questao);
    } )
  }, []);

  
  return ( 
    <>

        <header className='header-Home'>
            <nav className='container-header-home'>
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
                    <a className='laranja titulo-home' href="#">Como funciona?</a>
                    <a className='vinho titulo-home' href="#">Sobre nós</a>
                    <Link to="/meuschats" className='ciano titulo-home'>Chats</Link>
                </div>

                <div id='nav-bar-responsivo'>
                    <a className='laranja titulo-home' href="#">Como funciona?</a>
                    <a className='vinho titulo-home' href="#">Sobre nós</a>
                    <Link to="/meuschats" className='ciano titulo-home'>Chats</Link>
                </div> 

            </nav>
        </header>
      <div className="container-questionarios">
        {
          
          questionarios.map((q) => {
            return(
              <button onClick={() => {
                ListaQuestoesQuestionario(q)
                setQuestao(0);
                
                var containerMsg = document.getElementById('mensagens');
                containerMsg.innerHTML = '';
                
                containerMsg.innerHTML = containerMsg.innerHTML +'<p class="titulo-msg">' + 'Iniciando o questionario: ' + q.materia + ' - ' + q.assunto + '</p>'
              
              }}  className='btn-questionario'>{q.materia} - {q.assunto}</button>
            )
          })
        }
      </div>

      <div className="chat">
        <div id="mensagens" >
          <p className='titulo-msg'>Escolha um questionario acima</p>
        </div>
        <form id='form' onSubmit={(event) => {
            event.preventDefault();
            var msg = document.getElementById('msg');
            var containerMsg = document.getElementById('mensagens');

            containerMsg.innerHTML = containerMsg.innerHTML +' <div class="direita-chat"> <p class="msg-enviada">' + msg.value + '</p> </div>'
            
            mostrarquest()
            msg.value = ""
          }} className="input-mensagem">
          <input id='msg' type="text" />
          <button className='btn-chat' >Enviar</button>
        </form>
      </div>


    
      
      
    </>
  );
  
}