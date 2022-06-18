using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface IQuestaoRepository
    {
        /// <summary>
        /// Realiza o cadastro de uma questão
        /// </summary>
        /// <param name="novaQuestao">Objeto de questão</param>
        void Cadastrar(Questao novaQuestao);

        /// <summary>
        /// lista todas as questoes de um questionario
        /// </summary>
        /// <param name="idQuestionario">Id do questionario que deseja listar as questões</param>
        /// <returns>Uma lista com as questões do questionario especificado</returns>
        List<Questao> Listar(int idQuestionario);

        /// <summary>
        /// Atualiza algo na questão desejada
        /// </summary>
        /// <param name="questaoAtualizada">Objeto com as novas informações da questão</param>
        /// <param name="idQuestao">Id da questão que deseja alterar</param>
        void Atualizar(Questao questaoAtualizada, int idQuestao);

        /// <summary>
        /// Deleta uma questão
        /// </summary>
        /// <param name="idQuestao">Id da questão que será excluida</param>
        void Deletar(int idQuestao);

        Questao BuscarPorId(int id);
    }
}
