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
    public class QuestionariosController : Controller
    {
        private readonly IQuestionarioRepository _questionarioRepository;
        private readonly IEstudanteRepository _estudanteRepository;
        private readonly IProfessorRepository _professorRepository;


        public QuestionariosController(IQuestionarioRepository contexto, IEstudanteRepository ctx, IProfessorRepository context)
        {
            _questionarioRepository = contexto;
            _estudanteRepository = ctx;
            _professorRepository = context;
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                Estudante e  = _estudanteRepository.BuscarPorIdUser(idUsuario);

                return Ok(_questionarioRepository.Listar(e.IdSerie));

            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException.Message);
            }
        }

        [HttpGet("todos")]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_questionarioRepository.ListarTodos());

            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException.Message);
            }
        }

        [HttpPost]
        public IActionResult CriarQuestionario(Questionario q)
        {
            try
            {

                _questionarioRepository.Cadastrar(q);
                return StatusCode(200, "Questionario criado com sucesso");
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
                
                _questionarioRepository.Deletar(Id);
                return StatusCode(200, "Questionario apagado com sucesso");
                

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException.Message);
            }
        }

        [HttpPut("{Id}")]
        public IActionResult Put(Questionario QuestionarioAtualizado, int Id)
        {
            try
            {

                _questionarioRepository.Atualizar(QuestionarioAtualizado, Id);
                return StatusCode(200, "Alterado com sucesso");
                
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
            }
        }


    }
}
