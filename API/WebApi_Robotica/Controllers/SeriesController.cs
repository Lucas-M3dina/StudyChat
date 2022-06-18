using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Interfaces;

namespace WebApi_Robotica.Controllers
{

    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : Controller
    {
        private readonly ISerieRepository _serieRepository;

        public SeriesController(ISerieRepository contexto)
        {
            _serieRepository = contexto;
        }


        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_serieRepository.Listar());

            }
            catch (Exception ex) 
            {

                return StatusCode(500, ex.InnerException.Message);
            }
        }
    }
}
