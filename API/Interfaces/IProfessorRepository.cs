using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface IProfessorRepository
    {
        /// <summary>
        /// Cadastra um usuario Professor
        /// </summary>
        /// <param name="user">usuário Professor que será cadastrado</param>
        /// <returns>Um usuário Professor cadastrado</returns>
        public void Cadastrar(Professor user);

        /// <summary>
        /// Busca um usuário Professor através do ID
        /// </summary>
        /// <param name="id">ID do usuário do tipo Professor que será buscado</param>
        /// <returns>Um usuário Professor buscado</returns>
        Professor BuscarPorId(int id);

        public Professor BuscarPorIdUser(int id);
    }
}
