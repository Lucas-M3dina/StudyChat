using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;

namespace WebApi_Robotica.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class ProfessoresController : Controller
    {
        private readonly IProfessorRepository _professorRepository;

        public ProfessoresController(IProfessorRepository contexto)
        {
            _professorRepository = contexto;
        }


        [HttpPost]
        public IActionResult CadastrarProfessor(Professor novouser)
        {
            try
            {
                string email = novouser.IdUsuarioNavigation.Email.Split("@")[1].ToLower();
                if (email == "portalsesisp.org.br" )
                {
                    _professorRepository.Cadastrar(novouser);

                    return StatusCode(201);
                }

                return StatusCode(400, "O email não pertence ao SESI");

            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.InnerException.Message);
            }
        }
    }
}
