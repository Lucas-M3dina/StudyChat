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
    public class QuestaoRepository : IQuestaoRepository
    {
        private readonly RoboticaContext ctx;

        public QuestaoRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }


        public void Atualizar(Questao questaoAtualizada, int idQuestao)
        {
            Questao q = BuscarPorId(idQuestao);

            if (q.Enunciado != questaoAtualizada.Enunciado)
            {
                q.Enunciado = questaoAtualizada.Enunciado;
            }

            if (q.AlternativaA != questaoAtualizada.AlternativaA)
            {
                q.AlternativaA = questaoAtualizada.AlternativaA;
            }

            if (q.AlternativaB != questaoAtualizada.AlternativaB)
            {
                q.AlternativaB = questaoAtualizada.AlternativaB;
            }

            if (q.AlternativaC != questaoAtualizada.AlternativaC)
            {
                q.AlternativaC = questaoAtualizada.AlternativaC;
            }

            if (q.AlternativaD != questaoAtualizada.AlternativaD)
            {
                q.AlternativaD = questaoAtualizada.AlternativaD;
            }

            if (q.AlternativaCorreta != questaoAtualizada.AlternativaCorreta)
            {
                q.AlternativaCorreta = questaoAtualizada.AlternativaCorreta;
            }

            ctx.Questaos.Update(q);

            ctx.SaveChanges();
        }

        public Questao BuscarPorId(int id)
        {
            return ctx.Questaos.FirstOrDefault(p => p.IdQuestao == id);
        }

        public void Cadastrar(Questao novaQuestao)
        {
            ctx.Questaos.Add(novaQuestao);
            ctx.SaveChanges();
        }

        public void Deletar(int idQuestao)
        {
            Questao questaoBuscado = BuscarPorId(idQuestao);

            ctx.Questaos.Remove(questaoBuscado);

            ctx.SaveChanges();
        }

        public List<Questao> Listar(int idQuestionario)
        {
            return ctx.Questaos.Include(C => C.IdQuestionarioNavigation).Where(c => c.IdQuestionario == idQuestionario).ToList();
        }
    }
}
