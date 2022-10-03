using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface IEstudanteRepository
    {
        /// <summary>
        /// Cadastra um usuario estudante
        /// </summary>
        /// <param name="user">usuário estudante que será cadastrado</param>
        /// <returns>Um usuário estudante cadastrado</returns>
        public void Cadastrar(Estudante user);

        /// <summary>
        /// Busca um usuário através do ID
        /// </summary>
        /// <param name="id">ID do usuário do tipo estudante que será buscado</param>
        /// <returns>Um usuário estudante buscado</returns>
        Estudante BuscarPorId(int id);

        public Estudante BuscarPorIdUser(int id);

        public bool BuscarPorEmail(string email);
    }
}
