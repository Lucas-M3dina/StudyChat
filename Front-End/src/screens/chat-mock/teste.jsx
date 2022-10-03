import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import css from './teste.css'
import logo from '../../assets/logo.png'
import api from '../../services/api'


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materia: '',
      sentimento: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { materia, sentimento} = steps;

    this.setState({ materia, sentimento});
  }

  

  render() {
    const { materia, sentimento} = this.state;
    return (

      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody className='box-body-chat'>
            <tr>
              <td>Materia</td>
              <td>{materia.value}</td>
            </tr>
            <tr>
              <td>Sentimento</td>
              <td>{sentimento.value}</td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materia: '',
      sentimento: '',
      questionarios: [],
      test: [],

    };
  }

  salvarQuestionarios = (event) => {

    const token = {
      headers: {
         Authorization: "Bearer " + localStorage.getItem('usuario-login')
      }
   }

    api.get('api/questionarios', token)

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ questionarios: resposta.data});
          console.log(this.state.questionarios);
          this.state.questionarios.map(q => {
            this.state.test.push({ value: q.idQuestionario, label: q.assunto, trigger: '5' })
          })
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  componentDidMount(){
    
    this.salvarQuestionarios()
  }
  
  render() {
    return (
      <ChatBot
        steps={[
          { 
            id: '1',
            message: 'Olá! Qual chat gostaria de iniciar hoje?',
            trigger: 'materia',
          },

          {
            id: 'materia',
            
            options: this.state.test
          },
            
          
          
          {
            id: '5',
            message: 'Como você se sente hoje?',
            trigger: 'sentimento',
          },

          {
            id: 'sentimento',
            options: [
              {value: 'Ótimo', label: 'Ótimo!', trigger: '3'},
              {value: 'Bem', label: 'Bem', trigger: '3'},
              {value: 'Legal', label: 'Legal', trigger: '3'},
              {value: 'Mal', label: 'Mal', trigger: '3'},
              {value: 'Péssimo', label: 'Péssimo', trigger: '3'},
            ],
          },

          {
            id: '3',
            message: 'Está pronto para iniciar?',
            trigger: 'inicio',
          },
          {
            id: 'inicio',
            options: [
              { value: 'Sim!', label: 'Sim!', trigger: '10' },
              { value: 'Agora não', label: 'Agora não', trigger: '1' },
            ],
          },
          
          {
            id: '10',
            message: 'Resolva estas expressões numéricas e apresente o resultado na respectiva ordem. (180 + 67 – 204 + 49 =) (472 – 104 + 87 – 39 =) (619 – 478 + 219 – 187 =) (94 + 38 + 265 – 193 – 104 =)',
            trigger: 'resp10',
          },
          
          {
            id: 'resp10',
            options: [
              { value: '92!', label: '92', trigger: '1' },
              { value: '416', label: '416', trigger: '1' },
              { value: '173', label: '173', trigger: '1' },
              { value: '100', label: '100', trigger: '1' },
            ],
          },

        ]}
      />
    );
  }
}
//ideia fixar o numero de questões assim teriamos um fluxo construido alterando apenas os enunciados e questoes

export default SimpleForm;