using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface IQuestionarioRepository
    {
        /// <summary>
        /// Realiza o cadastro de um questionario
        /// </summary>
        /// <param name="novoQuestionario">Objeto de questionario</param>
        void Cadastrar(Questionario novoQuestionario);

        /// <summary>
        /// lista todas os questionarios de uma turma
        /// </summary>
        /// <param name="idSerie">Id da serie que deseja listar os questionarios</param>
        /// <returns>Uma lista com os questionarios de determinada turma</returns>
        List<Questionario> Listar(int? idSerie);

        /// <summary>
        /// Atualiza algo no questionario
        /// </summary>
        /// <param name="questionarioAtualizado">Objeto com as novas informações do questionario</param>
        /// <param name="idQuestionario">Id do questionario que deseja alterar</param>
        void Atualizar(Questionario questionarioAtualizado, int idQuestionario);

        /// <summary>
        /// Deleta um questionario
        /// </summary>
        /// <param name="idQuestionario">Id do questionario que será excluido</param>
        void Deletar(int idQuestionario);
    }
}
