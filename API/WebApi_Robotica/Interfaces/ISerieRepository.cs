using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Domains;

namespace WebApi_Robotica.Interfaces
{
    public interface ISerieRepository
    {
        /// <summary>
        /// Lista todas as Series
        /// </summary>
        /// <returns>Uma lista com todas as Series</returns>
        List<Serie> Listar();
    }
}
