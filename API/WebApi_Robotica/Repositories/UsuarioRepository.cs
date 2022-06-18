
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebApi_Robotica.Contexts;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;
using WebApi_Robotica.Utils;

namespace CloudPlanning_WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly RoboticaContext ctx;

        public UsuarioRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }

        public void Atualizar(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioAtualizado.Email != null)
            {
                usuarioBuscado.Email = usuarioAtualizado.Email;
            }

            if (usuarioAtualizado.Senha != null)
            {
                usuarioBuscado.Senha = usuarioAtualizado.Senha;
            }


            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Cripto.GerarHash(user.Senha);

            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(p => p.IdUsuario == id);
        }

        public void Deletar(int id)
        {
            Usuario UsuarioBuscado = BuscarPorId(id);

            ctx.Usuarios.Remove(UsuarioBuscado);

            ctx.SaveChanges();
        }

       public List<Usuario> Listar()
        {
            return ctx.Usuarios.ToList();
        } 

        public Usuario Login(string email, string password)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                bool comparado = Cripto.CompararSenha(password, usuario.Senha);

                if (comparado) return usuario;
            }
            return null;
        }
    }
}