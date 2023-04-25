using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebApi_Robotica.Domains;

#nullable disable

namespace WebApi_Robotica.Contexts
{
    public partial class RoboticaContext : DbContext
    {
        public RoboticaContext()
        {
        }

        public RoboticaContext(DbContextOptions<RoboticaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Estudante> Estudantes { get; set; }
        public virtual DbSet<Professor> Professors { get; set; }
        public virtual DbSet<Questao> Questaos { get; set; }
        public virtual DbSet<Questionario> Questionarios { get; set; }
        public virtual DbSet<Serie> Series { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
               optionsBuilder.UseSqlServer("Data Source=studychat.database.windows.net; initial catalog=studychat; user Id=studychat; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Estudante>(entity =>
            {
                entity.HasKey(e => e.IdEstudante)
                    .HasName("PK__Estudant__6E0B41E094E6F673");

                entity.ToTable("Estudante");

                entity.Property(e => e.IdEstudante).HasColumnName("idEstudante");

                entity.Property(e => e.IdSerie).HasColumnName("idSerie");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nome");

                entity.HasOne(d => d.IdSerieNavigation)
                    .WithMany(p => p.Estudantes)
                    .HasForeignKey(d => d.IdSerie)
                    .HasConstraintName("FK__Estudante__idSer__7F2BE32F");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Estudantes)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Estudante__idUsu__7E37BEF6");
            });

            modelBuilder.Entity<Professor>(entity =>
            {
                entity.HasKey(e => e.IdProfessor)
                    .HasName("PK__Professo__4E7C3C6D53E9EAE9");

                entity.ToTable("Professor");

                entity.Property(e => e.IdProfessor).HasColumnName("idProfessor");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Materia)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("materia");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(80)
                    .IsUnicode(false)
                    .HasColumnName("nome");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Professors)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Professor__idUsu__7B5B524B");
            });

            modelBuilder.Entity<Questao>(entity =>
            {
                entity.HasKey(e => e.IdQuestao)
                    .HasName("PK__Questao__BB81A065030F1645");

                entity.ToTable("Questao");

                entity.Property(e => e.IdQuestao).HasColumnName("idQuestao");

                entity.Property(e => e.AlternativaA)
                    .IsRequired()
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("alternativaA");

                entity.Property(e => e.AlternativaB)
                    .IsRequired()
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("alternativaB");

                entity.Property(e => e.AlternativaC)
                    .IsRequired()
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("alternativaC");

                entity.Property(e => e.AlternativaCorreta)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("alternativaCorreta");

                entity.Property(e => e.AlternativaD)
                    .IsRequired()
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("alternativaD");

                entity.Property(e => e.Enunciado)
                    .IsRequired()
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("enunciado");

                entity.Property(e => e.IdQuestionario).HasColumnName("idQuestionario");

                entity.HasOne(d => d.IdQuestionarioNavigation)
                    .WithMany(p => p.Questaos)
                    .HasForeignKey(d => d.IdQuestionario)
                    .HasConstraintName("FK__Questao__idQuest__787EE5A0");
            });

            modelBuilder.Entity<Questionario>(entity =>
            {
                entity.HasKey(e => e.IdQuestionario)
                    .HasName("PK__Question__D008AC8E75CFD634");

                entity.ToTable("Questionario");

                entity.Property(e => e.IdQuestionario).HasColumnName("idQuestionario");

                entity.Property(e => e.Assunto)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("assunto");

                entity.Property(e => e.IdSerie).HasColumnName("idSerie");

                entity.Property(e => e.Materia)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("materia");

                entity.HasOne(d => d.IdSerieNavigation)
                    .WithMany(p => p.Questionarios)
                    .HasForeignKey(d => d.IdSerie)
                    .HasConstraintName("FK__Questiona__idSer__75A278F5");
            });

            modelBuilder.Entity<Serie>(entity =>
            {
                entity.HasKey(e => e.IdSerie)
                    .HasName("PK__Serie__9E10C73DC5C8F8A4");

                entity.ToTable("Serie");

                entity.Property(e => e.IdSerie).HasColumnName("idSerie");

                entity.Property(e => e.Sala)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("sala");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TipoUsua__03006BFF22EC107E");

                entity.ToTable("TipoUsuario");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("titulo");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__645723A640D010AB");

                entity.ToTable("Usuario");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Senha)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__Usuario__idTipoU__70DDC3D8");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
