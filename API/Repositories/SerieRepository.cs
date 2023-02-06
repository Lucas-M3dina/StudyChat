using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Robotica.Contexts;
using WebApi_Robotica.Domains;
using WebApi_Robotica.Interfaces;

namespace WebApi_Robotica.Repositories
{
    public class SerieRepository : ISerieRepository
    {
        private readonly RoboticaContext ctx;

        public SerieRepository(RoboticaContext appContext)
        {
            ctx = appContext;
        }

        public List<Serie> Listar()
        {
            return ctx.Series.ToList();
        }
    }
}
