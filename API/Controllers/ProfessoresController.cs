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
        private readonly IUsuarioRepository _usuarioRepository;

        public ProfessoresController(IProfessorRepository contexto, IUsuarioRepository ctx)
        {
            _professorRepository = contexto;
            _usuarioRepository = ctx;
        }


        [HttpPost]
        public IActionResult CadastrarProfessor(Professor novouser)
        {
            try
            {
                novouser.IdUsuarioNavigation.IdTipoUsuario = 1;
                string email = novouser.IdUsuarioNavigation.Email.Split("@")[1].ToLower();
                if (email == "portalsesisp.org.br" )
                {
                    if (!_usuarioRepository.BuscarPorEmail(novouser.IdUsuarioNavigation.Email))
                    {
                        _professorRepository.Cadastrar(novouser);

                        return StatusCode(201);
                    }

                    return StatusCode(500, "Email ja está em uso");
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
