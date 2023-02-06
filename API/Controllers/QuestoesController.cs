using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;

namespace WebApi_Robotica.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class QuestoesController : Controller
    {
        private readonly IQuestaoRepository _questaoRepository;

        public QuestoesController(IQuestaoRepository contexto)
        {
            _questaoRepository = contexto;
        }

        [HttpGet("{idQuestionario}")]
        public IActionResult Listar(int idQuestionario)
        {
            try
            {
                
                return Ok(_questaoRepository.Listar(idQuestionario));

            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException.Message);
            }
        }

        [HttpPost]
        public IActionResult CriarQuestao(Questao q)
        {
            try
            {

                _questaoRepository.Cadastrar(q);
                return StatusCode(200, "Questao criada com sucesso");
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {

                _questaoRepository.Deletar(Id);
                return StatusCode(200, "Questao apagada com sucesso");


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException.Message);
            }
        }

        [HttpPut("{Id}")]
        public IActionResult Put(Questao QuestaoAtualizada, int Id)
        {
            try
            {

                _questaoRepository.Atualizar(QuestaoAtualizada, Id);
                return StatusCode(200, "Questão alterada com sucesso");

            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
            }
        }

    }
}
