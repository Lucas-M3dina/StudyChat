import React, { useState, useEffect} from "react";
import css from "./meus-chats.css"
import api from '../../services/api'
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import BannerPrincipal from '../../assets/banner-meuschats.png'
import BannerSecundario from '../../assets/banner-secundario.png'


export default function MeusChats() {
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [idSerie, setIdSerie] = useState(0);
  const [series, setSeries] = useState([]);
  const [questionarios, setQuestionarios] = useState([]);

  const [idQuestionario, setIdQuestionarios] = useState(0);
  const [enunciado, setEnunciado] = useState('');
  const [alternativaA, setAlternativaA] = useState('');
  const [alternativaB, setAlternativaB] = useState('');
  const [alternativaC, setAlternativaC] = useState('');
  const [alternativaD, setAlternativaD] = useState('');
  const [alternativaCorreta, setAlternativaCorreta] = useState('');

  

  /* {
    "idQuestionario": 1,
    "enunciado": "Quando o brasil foi descoberto?",
    "alternativaA": "1222",
    "alternativaB": "1800",
    "alternativaC": "1899",
    "alternativaD": "1500",
    "alternativaCorreta": "1500"
  } */

  function criaQuestionario(event){
    event.preventDefault();

    api.post('/api/Questionarios', {
      assunto: assunto,
      materia: materia,
      idSerie: idSerie
    })
  }

  function criaQuestao(event){
    event.preventDefault();

    api.post('/api/questoes', {
      idQuestionario: idQuestionario,
      enunciado: enunciado,
      alternativaA: alternativaA,
      alternativaB: alternativaB,
      alternativaC: alternativaC,
      alternativaD: alternativaD,
      alternativaCorreta: alternativaCorreta
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

  function listarQuestionarios(){
    api.get('/api/questionarios/todos')
    .then(resposta => {
      if (resposta.status === 200) {
        setQuestionarios(resposta.data);
      }
    })
  }
  
  function trocarTab(){
    const btnTroca = document.querySelectorAll(".tab-bar div");
    const vetorQuestionarios = document.querySelectorAll(".questionarios-icon path");
    const vetorQuestoes = document.querySelectorAll(".questoes-icon path");
    const questionarios = document.querySelector('.questionario');
    const questoes = document.querySelector('.questoes');

    const activeTab = (index) => {
      
      btnTroca.forEach((content) => {
        content.classList.replace('tab-ativa', 'tab-inativa');
      });
      
      if (index === 0) {
        vetorQuestoes.forEach((content) => {
          content.style.fill = '#371A45'
        });
        vetorQuestionarios.forEach((content) => {
          content.style.fill = '#933FA8'
        });
        questoes.style.display = 'none';
        questionarios.style.display = 'flex';
      } else if (index === 1){
        vetorQuestoes.forEach((content) => {
          content.style.fill = '#933FA8'
        });
        vetorQuestionarios.forEach((content) => {
          content.style.fill = '#371A45'
        });
        questoes.style.display = 'flex';
        questionarios.style.display = 'none';
      }

      btnTroca[index].classList.replace('tab-inativa', 'tab-ativa');
    }

    btnTroca.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        activeTab(index);
      });
    });
  }

  useEffect(() => {
    listarSerie();
    trocarTab();
    listarQuestionarios();
  }, [])
  


  return (
    <>
        <Header item1="Criar formularios" item2="Como funciona?"/>
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
                <div className="tab-ativa icon-questionario"> 
<svg width="34" height="35" viewBox="0 0 34 35" fill="#933FA8" className="icon-form questionarios-icon" xmlns="http://www.w3.org/2000/svg">
<path d="M32.0815 0.723633H1.91847C0.860128 0.723633 0 1.58448 0 2.64282V34.2997L6.81013 27.4896H32.0815C33.1399 27.4896 34 26.6287 34 25.5704V2.64282C34 1.58448 33.1399 0.723633 32.0815 0.723633ZM7.95745 7.95768H16.6383C17.0383 7.95768 17.3617 8.28176 17.3617 8.68108C17.3617 9.0804 17.0383 9.40448 16.6383 9.40448H7.95745C7.5574 9.40448 7.23404 9.0804 7.23404 8.68108C7.23404 8.28176 7.5574 7.95768 7.95745 7.95768ZM26.0426 19.5321H7.95745C7.5574 19.5321 7.23404 19.2081 7.23404 18.8087C7.23404 18.4094 7.5574 18.0853 7.95745 18.0853H26.0426C26.4426 18.0853 26.766 18.4094 26.766 18.8087C26.766 19.2081 26.4426 19.5321 26.0426 19.5321ZM26.0426 14.4683H7.95745C7.5574 14.4683 7.23404 14.1442 7.23404 13.7449C7.23404 13.3456 7.5574 13.0215 7.95745 13.0215H26.0426C26.4426 13.0215 26.766 13.3456 26.766 13.7449C26.766 14.1442 26.4426 14.4683 26.0426 14.4683Z" fill="#933FA8"/>
</svg> Questionarios</div>
                <div className="tab-inativa icon-questao"> 
<svg className="icon-form questoes-icon" width="38" height="38" viewBox="0 0 38 38"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 4.3001C17.0696 4.3001 15.1581 4.68033 13.3746 5.41907C11.5911 6.15781 9.97056 7.24061 8.60554 8.60563C7.24052 9.97065 6.15772 11.5912 5.41898 13.3747C4.68023 15.1581 4.30001 17.0697 4.30001 19.0001C4.30001 20.9305 4.68023 22.8421 5.41898 24.6256C6.15772 26.409 7.24052 28.0296 8.60554 29.3946C9.97056 30.7596 11.5911 31.8424 13.3746 32.5811C15.1581 33.3199 17.0696 33.7001 19 33.7001C22.8987 33.7001 26.6377 32.1514 29.3945 29.3946C32.1513 26.6378 33.7 22.8988 33.7 19.0001C33.7 15.1014 32.1513 11.3624 29.3945 8.60563C26.6377 5.84884 22.8987 4.3001 19 4.3001ZM0.100006 19.0001C0.100006 13.9875 2.09125 9.18022 5.63569 5.63578C9.18013 2.09134 13.9874 0.100098 19 0.100098C24.0126 0.100098 28.8199 2.09134 32.3643 5.63578C35.9088 9.18022 37.9 13.9875 37.9 19.0001C37.9 24.0127 35.9088 28.82 32.3643 32.3644C28.8199 35.9089 24.0126 37.9001 19 37.9001C13.9874 37.9001 9.18013 35.9089 5.63569 32.3644C2.09125 28.82 0.100006 24.0127 0.100006 19.0001ZM17.7883 12.7001C17.2742 12.7001 16.7812 12.9043 16.4177 13.2678C16.0542 13.6313 15.85 14.1243 15.85 14.6384V15.4469C15.85 16.0039 15.6288 16.538 15.2349 16.9318C14.8411 17.3257 14.307 17.5469 13.75 17.5469C13.1931 17.5469 12.6589 17.3257 12.2651 16.9318C11.8713 16.538 11.65 16.0039 11.65 15.4469V14.6384C11.65 13.0104 12.2967 11.4491 13.4479 10.298C14.599 9.14681 16.1603 8.5001 17.7883 8.5001H19C23.0761 8.5001 26.35 11.8412 26.35 15.8837C26.35 17.8304 25.342 19.6637 23.6704 20.6927L20.1004 22.8893C19.8655 23.0338 19.6043 23.1306 19.332 23.1742C19.0596 23.2178 18.7813 23.2073 18.513 23.1434C18.2446 23.0794 17.9915 22.9632 17.7681 22.8014C17.5447 22.6397 17.3553 22.4355 17.2108 22.2005C16.919 21.726 16.8276 21.155 16.9568 20.613C17.0859 20.0711 17.4251 19.6027 17.8996 19.3109L21.4696 17.1143C21.678 16.9837 21.8498 16.8022 21.9688 16.5869C22.0878 16.3717 22.1502 16.1297 22.15 15.8837C22.15 14.126 20.722 12.7001 19 12.7001H17.7883ZM19.021 29.5001C19.578 29.5001 20.1121 29.2789 20.5059 28.885C20.8998 28.4912 21.121 27.9571 21.121 27.4001C21.121 26.8432 20.8998 26.309 20.5059 25.9152C20.1121 25.5214 19.578 25.3001 19.021 25.3001H19C18.4431 25.3001 17.9089 25.5214 17.5151 25.9152C17.1213 26.309 16.9 26.8432 16.9 27.4001C16.9 27.9571 17.1213 28.4912 17.5151 28.885C17.9089 29.2789 18.4431 29.5001 19 29.5001H19.021Z" fill="#371A45"/>
</svg> Questões</div>
              </div>

              <div className="questionario">
                <p className="texto-questionarios">Cadastre um questionário</p>
                <form className="container-form-questionario" onSubmit={(e) => {criaQuestionario(e)}}>
                  <div className="container-input-questionario">
                    <input className="input-criar-questionario" type="text" name="materia" placeholder=" Matéria" onChange={(e) => {setMateria(e.target.value)}} required/>

                    <select className="input-criar-questionario" value={idSerie} onChange={(e) => {setIdSerie(e.target.value)}} name="idSerie" required>
                        <option value="0">   Selecione uma sala</option>
                        {series.map(s => {
                            return (
                                <option value={s.idSerie}>{s.sala}</option>
                            )
                        })}
                    </select>
                  </div>

                  <input className="input-assunto-criar-questionario" type="text" name="assunto" placeholder=" Escreva o assunto do questionário" onChange={(e) => {setAssunto(e.target.value)}} required/>
                  <button className="btn-criar-questionario" type="submit">Cadastrar</button>
                </form>
              </div>

              <div className="questoes">
                <p className="texto-questionarios">Cadastre uma questão</p>
                <form className="container-form-questionario" onSubmit={(e) => {criaQuestao(e)}}>
                  <div className="container-input-questionario">

                    <select className="input-criar-questionario" value={idQuestionario} onChange={(e) => {setIdQuestionarios(e.target.value)}} name="idQuestionario" required>
                        <option value="0">   Selecione um Questionario</option>
                        {questionarios.map(s => {
                            return (
                                <option value={s.idQuestionario}>{s.assunto}</option>
                            )
                        })}
                    </select>

                    <select className="input-criar-questionario"  onChange={(e) => {setAlternativaCorreta(e.target.value)}}>
                      <option value=''>   Qual é a alternativa correta?</option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                      <option value='D'>D</option>

                    </select>
                  </div>

                  <input className="input-criar-questionario" type="text" placeholder=" Enunciado" onChange={(e) => {setEnunciado(e.target.value)}} required/>

                  <div className="container-input-questionario">
                    <input className="input-criar-questionario" type="text" placeholder=" Alternativa A" onChange={(e) => {setAlternativaA(e.target.value)}} required/>
                    <input className="input-criar-questionario" type="text" placeholder=" Alternativa B" onChange={(e) => {setAlternativaB(e.target.value)}} required/>
                    
                  </div>

                  <div className="container-input-questionario zerar-margin">
                    <input className="input-criar-questionario" type="text" placeholder=" Alternativa C" onChange={(e) => {setAlternativaC(e.target.value)}} required/>
                    <input className="input-criar-questionario" type="text" placeholder=" Alternativa D" onChange={(e) => {setAlternativaD(e.target.value)}} required/>
                  </div>

                  <button className="btn-criar-questionario" type="submit">Cadastrar</button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <Footer/>

        
    </>
  );
}