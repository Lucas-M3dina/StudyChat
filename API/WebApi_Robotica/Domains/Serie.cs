using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_Robotica.Domains
{
    public partial class Serie
    {
        public Serie()
        {
            Estudantes = new HashSet<Estudante>();
            Questionarios = new HashSet<Questionario>();
        }

        public int IdSerie { get; set; }
        public string Sala { get; set; }

        public virtual ICollection<Estudante> Estudantes { get; set; }
        public virtual ICollection<Questionario> Questionarios { get; set; }
    }
}
