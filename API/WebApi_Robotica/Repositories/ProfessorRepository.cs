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
    public class ProfessorRepository : IProfessorRepository
    {
        private readonly RoboticaContext ctx;

        public ProfessorRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }

        public Professor BuscarPorId(int id)
        {
            return ctx.Professors.FirstOrDefault(p => p.IdProfessor == id);
        }

        public void Cadastrar(Professor user)
        {
            user.IdUsuarioNavigation.Senha = Cripto.GerarHash(user.IdUsuarioNavigation.Senha);

            ctx.Professors.Add(user);
            ctx.SaveChanges();
        }
    }
}
