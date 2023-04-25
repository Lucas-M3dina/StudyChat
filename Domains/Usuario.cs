using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_Robotica.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Estudantes = new HashSet<Estudante>();
            Professors = new HashSet<Professor>();
        }

        public int IdUsuario { get; set; }
        public int? IdTipoUsuario { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Estudante> Estudantes { get; set; }
        public virtual ICollection<Professor> Professors { get; set; }
    }
}
