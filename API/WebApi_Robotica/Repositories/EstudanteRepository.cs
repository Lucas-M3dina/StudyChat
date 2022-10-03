using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Contexts;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;
using WebApi_Robotica.Utils;

namespace WebApi_Robotica.Repositories
{
    public class EstudanteRepository : IEstudanteRepository
    {
        private readonly RoboticaContext ctx;

        public EstudanteRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }

        public Estudante BuscarPorId(int id)
        {
            return ctx.Estudantes.FirstOrDefault(p => p.IdEstudante == id);
        }
        public Estudante BuscarPorIdUser(int id)
        {
            return ctx.Estudantes.FirstOrDefault(p => p.IdUsuario == id);
        }

        public bool BuscarPorEmail(string email)
        {
            var e = ctx.Estudantes.FirstOrDefault(p => p.IdUsuarioNavigation.Email == email);
            if (e == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public void Cadastrar(Estudante user)
        {
            user.IdUsuarioNavigation.Senha = Cripto.GerarHash(user.IdUsuarioNavigation.Senha);

            ctx.Estudantes.Add(user);
            ctx.SaveChanges();
        }
    }
}
