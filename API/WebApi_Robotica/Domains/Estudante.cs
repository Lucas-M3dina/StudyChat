using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_Robotica.Domains
{
    public partial class Estudante
    {
        public int IdEstudante { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdSerie { get; set; }
        public string Nome { get; set; }

        public virtual Serie IdSerieNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
