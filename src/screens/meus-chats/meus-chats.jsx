import React, { useState, useEffect} from "react";
import css from "./meus-chats.css"
import api from '../../services/api'
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import Header from '../../components/header/header'
import BannerPrincipal from '../../assets/banner-meuschats.png'
import BannerSecundario from '../../assets/banner-secundario.png'
import MsgIcon from '../../assets/msg-icon.png'
import QuestaoIcon from '../../assets/questoes-icon.png'


export default function MeusChats() {
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [idSerie, setIdSerie] = useState(0);
  const [series, setSeries] = useState([]);

  function criaQuestionario(event){
    event.preventDefault();

    api.post('/api/Questionarios', {
      assunto: assunto,
      materia: materia,
      idSerie: idSerie
    })
  }

  function listarSerie(){
    api.get('/api/series')
    .then(resposta => {
      if (resposta.status === 200) {
        setSeries(resposta.data)
      }
    })
    
  }

  useEffect(() => {
    listarSerie();
  }, [])
  


  return (
    <>
        <Header/>
        <main className="main-meuschats">
          <section className="banner-principal">
            <div className="container-banner-principal">
              <p className="texto-principal">Crie seus questionários com as questões que desejar</p>
              <div className="btn-banner-principal">
                <Link className="btn-criar" href="#">Criar</Link>
                <Link className="btn-volta" href="/">Voltar</Link>
              </div>
            </div>

            <img className="figura-questionario" src={BannerPrincipal} alt="Figura de questionario"/>
          </section>

          <section className="banner-secundario">
            <img className="figura-banner-secundario" src={BannerSecundario} alt="Figura de outro questionario"/>
            <p className="texto-banner-secundario">Esta tela de cadastro de questionários e questões é simples e intuitiva para criar e gerenciar questionários. Aqui, você pode criar um novo questionário, adicionar e editar questões e definir opções de resposta</p>
          </section>

          <section className="formularios">
            <div className="box-formularios">
              <div className="tab-bar">
                <div className="tab-questionario"> <img className="msg-icon" src={MsgIcon} alt='Icon questionario' /> Questionarios</div>
                <div className="tab-questoes"> <img className="questao-icon" src={QuestaoIcon} alt='Icon questões' /> Questões</div>
              </div>

              <div className="questionario">
                <p className="texto-questionarios">Cadastre um questionário</p>
                <form className="container-form-questionario">
                  <div className="container-input-questionario">
                    <input className="input-criar-questionario" type="text" name="materia" placeholder="Matéria" required/>

                    <select className="input-criar-questionario" onChange={(e) => {setIdSerie(e.event.target.value)}} name="idSerie" required>
                        <option value="0">Selecione uma sala</option>
                        {series.map(s => {
                            return (
                                <option value={s.idSerie}>{s.sala}</option>
                            )
                        })}
                    </select>
                  </div>

                  <input className="input-assunto-criar-questionario" type="text" name="assunto" placeholder="Escreva o assunto do questionário" required/>
                  <button className="btn-criar-questionario" type="submit">Cadastrar</button>
                </form>
              </div>
            </div>
          </section>
        </main>
    </>
  );
}