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
        private readonly IUsuarioRepository _usuarioRepository;

        public EstudantesController(IEstudanteRepository contexto, IUsuarioRepository ctx )
        {
            _estudanteRepository = contexto;
            _usuarioRepository = ctx;
        }


        [HttpPost]
        public IActionResult CadastrarEstudante(Estudante novouser)
        {
            try
            {
                novouser.IdUsuarioNavigation.IdTipoUsuario = 2;

                string email = novouser.IdUsuarioNavigation.Email.Split("@")[1].ToLower();
                if (email == "portalsesisp.org.br")
                {
                    if (!_usuarioRepository.BuscarPorEmail(novouser.IdUsuarioNavigation.Email))
                    {
                        _estudanteRepository.Cadastrar(novouser);

                        return StatusCode(201);
                    }

                    return StatusCode(500, "Email ja está em uso");
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
