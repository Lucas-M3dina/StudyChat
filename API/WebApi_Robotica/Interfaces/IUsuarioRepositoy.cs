﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Valida o usuário e realiza o login
        /// </summary>
        /// <param name="email">E-mail do usuário</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns>Um objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        List<Usuario> Listar();

        /// <summary>
        /// Atualiza um usuário existente
        /// </summary>
        /// <param name="id">ID do usuário que será atualizado</param>
        /// <param name="usuarioAtualizado">Objeto com as novas informações</param>
        void Atualizar(int id, Usuario usuarioAtualizado);

        /// <summary>
        /// Deleta um usuário existente
        /// </summary>
        /// <param name="id">ID do usuário que será deletado</param>
        void Deletar(int id);

        /// <summary>
        /// Busca um usuário através do ID
        /// </summary>
        /// <param name="id">ID do usuário que será buscado</param>
        /// <returns>Um usuário buscado</returns>
        Usuario BuscarPorId(int id);

        /// <summary>
        /// Cadastra um usuario
        /// </summary>
        /// <param name="user">usuário que será cadastrado</param>
        /// <returns>Um usuário cadastrado</returns>
        public void Cadastrar(Usuario user);
    }
}

