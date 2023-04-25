using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_Robotica.Domains
{
    public partial class Questao
    {
        public int IdQuestao { get; set; }
        public int? IdQuestionario { get; set; }
        public string Enunciado { get; set; }
        public string AlternativaA { get; set; }
        public string AlternativaB { get; set; }
        public string AlternativaC { get; set; }
        public string AlternativaD { get; set; }
        public string AlternativaCorreta { get; set; }

        public virtual Questionario IdQuestionarioNavigation { get; set; }
    }
}
