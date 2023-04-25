using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Contexts;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;

namespace WebApi_Robotica.Repositories
{
    public class QuestionarioRepository : IQuestionarioRepository
    {
        private readonly RoboticaContext ctx;

        public QuestionarioRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }


        public void Atualizar(Questionario questionarioAtualizado, int idQuestionario)
        {
            Questionario q = BuscarPorId(idQuestionario);

            if (q.Assunto != questionarioAtualizado.Assunto)
            {
                q.Assunto = questionarioAtualizado.Assunto;
            }

            if (q.Materia != questionarioAtualizado.Materia)
            {
                q.Materia = questionarioAtualizado.Materia;
            }

            if (q.IdSerie != questionarioAtualizado.IdSerie)
            {
                q.IdSerie = questionarioAtualizado.IdSerie;
            }

            ctx.Questionarios.Update(q);

            ctx.SaveChanges();
        }

        public void Cadastrar(Questionario novoQuestionario)
        {
            
            ctx.Questionarios.Add(novoQuestionario);
            ctx.SaveChanges();
        }

        public Questionario BuscarPorId(int id)
        {
            return ctx.Questionarios.FirstOrDefault(p => p.IdQuestionario == id);
        }

        public void Deletar(int idQuestionario)
        {
            Questionario questionarioBuscado = BuscarPorId(idQuestionario);

            ctx.Questionarios.Remove(questionarioBuscado);

            ctx.SaveChanges();
        }

        public List<Questionario> Listar(int? idSerie)
        {
            return ctx.Questionarios.Include(C => C.IdSerieNavigation).Where(c => c.IdSerie == idSerie).ToList();
        }
        
        public List<Questionario> ListarTodos()
        {
            return ctx.Questionarios.ToList();
        }
    }
}
