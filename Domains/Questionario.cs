using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_Robotica.Domains
{
    public partial class Questionario
    {
        public Questionario()
        {
            Questaos = new HashSet<Questao>();
        }

        public int IdQuestionario { get; set; }
        public int? IdSerie { get; set; }
        public string Materia { get; set; }
        public string Assunto { get; set; }

        public virtual Serie IdSerieNavigation { get; set; }
        public virtual ICollection<Questao> Questaos { get; set; }
    }
}
