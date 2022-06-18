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
    public class EstudantesController : Controller
    {
        private readonly IEstudanteRepository _estudanteRepository;

        public EstudantesController(IEstudanteRepository contexto)
        {
            _estudanteRepository = contexto;
        }


        [HttpPost]
        public IActionResult CadastrarEstudante(Estudante novouser)
        {
            try
            {
                string email = novouser.IdUsuarioNavigation.Email.Split("@")[1].ToLower();
                if (email == "portalsesisp.org.br")
                {
                    _estudanteRepository.Cadastrar(novouser);

                    return StatusCode(201);
                }

                return StatusCode(500, "Email não pertence ao SESI");
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
