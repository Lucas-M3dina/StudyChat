import React, { useState, useEffect} from "react";
import css from "./meus-chats.css"
import api from '../../services/api'
import Logo from '../../assets/logo.png'
import LinhaEsquerda from '../../assets/linha-esquerda.png'
import LinhaDireita from '../../assets/linha-direita.png'
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../../services/auth';


export default function MeusChats() {
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [idSerie, setIdSerie] = useState(0);
  const [enunciado, setEnunciado] = useState('');
  const [alternativaA, setAlternativaA] = useState('');
  const [alternativaB, setAlternativaB] = useState('');
  const [alternativaC, setAlternativaC] = useState('');
  const [alternativaD, setAlternativaD] = useState('');
  const [alternativaCorreta, setAlternativaCorreta] = useState('');
  const [series, setSeries] = useState([]);
  const [questionarios, setQuestionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idQuestionario, setIdQuestionario] = useState(0);



  function nivelAcesso(){
    if (parseJWT().TipoUsuario !== "1" ) {
      console.log("este usuario n é professor");
    }
  }

  function listarSerie(){
    api.get('/api/series')
    .then(resposta => {
      if (resposta.status === 200) {
        setSeries(resposta.data);
        console.log(series);
      }
    }).catch(() => {
      console.log('algo deu ruim ');
    })

    
  }

  function salvarQuestionarios(){
    api.get('api/questionarios/todos')

      .then(resposta => {
        if (resposta.status === 200) {
          setQuestionarios(resposta.data);
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  function cadastrarFormulario(e){
    e.preventDefault()
    api.post('/api/questionarios', {
      materia: materia,
      idSerie: idSerie,
      assunto: assunto,
    })
  }

  function cadastrarquestao(e){
    e.preventDefault()
    api.post('/api/questoes', {
      idQuestionario: idQuestionario,
      enunciado: enunciado,
      alternativaA: alternativaA,
      alternativaB: alternativaB,
      alternativaC: alternativaC,
      alternativaD: alternativaD,
      alternativaCorreta: alternativaCorreta,
    })
  }
 
  

  useEffect(() => {
    listarSerie();
    salvarQuestionarios();
  }, [])

  if (usuarioAutenticacao()) {
    
  
    if (true) {
      
    
    return (
      <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous"></link>
        <header className="header-meusChats">
          <Link to="/home"> <img src={Logo} alt="Logo" className="logo-header" /> </Link> 
        </header>

        <main className="main-meusChats">
            <section className="container-titulo">
                <img src={LinhaEsquerda} alt="linha Esquerda decorativa" className="linha" />
                <h1 className="titulo">Meus Chats</h1>
                <img src={LinhaDireita} alt="Linha Direita decorativa" className="linha" />
            </section>

            <section className="centralizar">
              <h1 className="tit">Cadastre um Questionario</h1>
              <form className="mb-3 questionario centralizar" onSubmit={cadastrarFormulario}>
                  <input className="form-control" type="text" placeholder="Materia"
                  name="materia"
                  value={materia}
                  onChange={(e) => {
                    setMateria(e.target.value)
                  }} />

                  <select className="form-select" onChange={(e) => { setIdSerie(e.target.value) }} name="idSerie" required>
                      <option value="0">Selecione uma sala</option>
                      {series.map(s => {
                          return (
                              <option value={s.idSerie}>{s.sala}</option>
                          )
                      })}
                  </select>

                  <input className="form-control" type="text" placeholder="Assunto"
                  name="assunto"
                  value={assunto}
                  onChange={(e) => { setAssunto(e.target.value) }} />

                  <button className="btn btn-estilo btn-primary" type="submit">Cadastrar</button>
              </form>

              <h1 className="tit">Cadastre Questões</h1>
              <form className="mb-3 questionario centralizar" onSubmit={cadastrarquestao}>
                  <input className="form-control" type="text" placeholder="Enunciado"
                  name="enunciado"
                  value={enunciado}
                  onChange={(e) => { setEnunciado(e.target.value) }} />

                  <input className="form-control" type="text" placeholder="Alternativa A"
                  name="alternativaA"
                  value={alternativaA}
                  onChange={(e) => { setAlternativaA(e.target.value) }} />

                  <input className="form-control" type="text" placeholder="Alternativa B"
                  name="alternativaB"
                  value={alternativaB}
                  onChange={(e) => { setAlternativaB(e.target.value) }} />

                  <input className="form-control" type="text" placeholder="Alternativa C"
                  name="alternativaC"
                  value={alternativaC}
                  onChange={(e) => { setAlternativaC(e.target.value) }} />

                  <input className="form-control" type="text" placeholder="Alternativa D"
                  name="alternativaD"
                  value={alternativaD}
                  onChange={(e) => { setAlternativaD(e.target.value) }} />

                  <select className="form-select" onChange={(e) => { setAlternativaCorreta(e.target.value) }} name="alternativaCorreta" required>
                      <option value="0">Selecione a alternativa correta para a questão</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                  </select>

                  <select className="form-select"  onChange={(e) => { setIdQuestionario(e.target.value) }}  name="idQuestionario" required>
                      <option value="0">Selecione o questionario </option>
                      {questionarios.map(q => {
                          return (
                              <option value={q.idQuestionario}>{q.assunto}</option>
                          )
                      })}
                  </select>

                  

                  <button className="btn btn-estilo btn-primary" type="submit">Cadastrar</button>
              </form>

            </section>
        </main>

      </>
    );
    }
    else{
      return(
        window.location.href = '/home'
      );
    }
  }
  else{
    return(
      window.location.href = '/'
    );
  }
}
