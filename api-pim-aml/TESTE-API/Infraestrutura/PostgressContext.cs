using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TESTE_API.Entities;

namespace TESTE_API.Entities;

public partial class PostgressContext : DbContext
{
    public PostgressContext()
    {
    }

    public PostgressContext(DbContextOptions<PostgressContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cargo> Cargos { get; set; }

    public virtual DbSet<ControleDeHora> ControleDeHoras { get; set; }

    public virtual DbSet<Funcionarios> Funcionarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=pim-database.czpldp3qvtb6.us-east-1.rds.amazonaws.com;Port=5432;Database=postgres;User Id=postgres;Password=pimdatabase123;Persist Security Info=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cargo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("id_cargo");

            entity.ToTable("cargo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nome)
                .HasMaxLength(60)
                .HasColumnName("nome");
        });

        modelBuilder.Entity<ControleDeHora>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("id_controle_horas");

            entity.ToTable("controle_de_horas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataEntrada)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("data_entrada");
            entity.Property(e => e.DataSaida)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("data_saida");
            entity.Property(e => e.HorasTotal)
                .HasPrecision(10, 2)
                .HasColumnName("horas_total");
            entity.Property(e => e.IdFuncionario).HasColumnName("id_funcionario");
            entity.Property(e => e.Mes).HasColumnName("mes");

            entity.HasOne(d => d.IdFuncionarioNavigation).WithMany(p => p.ControleDeHoras)
                .HasForeignKey(d => d.IdFuncionario)
                .HasConstraintName("id_funcionario");
        });

        modelBuilder.Entity<Funcionarios>(entity =>
        {
            entity.HasKey(e => e.id_funcionario).HasName("id_funcionario");

            entity.ToTable("funcionarios");

            entity.HasIndex(e => e.cpf, "funcionario_cpf_key").IsUnique();

            entity.HasIndex(e => e.ctps, "funcionario_ctps_key").IsUnique();

            entity.HasIndex(e => e.email, "funcionario_email_key").IsUnique();

            entity.Property(e => e.id_funcionario)
                .HasDefaultValueSql("nextval('funcionario_id_funcionario_seq'::regclass)")
                .HasColumnName("id_funcionario");
            entity.Property(e => e.ativo)
                .IsRequired()
                .HasDefaultValueSql("true")
                .HasColumnName("ativo");
            entity.Property(e => e.banco)
                .HasMaxLength(25)
                .HasColumnName("banco");
            entity.Property(e => e.conta)
                .HasMaxLength(10)
                .HasColumnName("conta");
            entity.Property(e => e.cpf)
                .HasMaxLength(20)
                .HasColumnName("cpf");
            entity.Property(e => e.ctps)
                .HasMaxLength(20)
                .HasColumnName("ctps");
            entity.Property(e => e.data_admissao).HasColumnName("data_admissao");
            entity.Property(e => e.data_nascimento).HasColumnName("data_nascimento");
            entity.Property(e => e.email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.endereco).HasColumnName("endereco");
            entity.Property(e => e.genero)
                .HasMaxLength(20)
                .HasColumnName("genero");
            entity.Property(e => e.id_cargo).HasColumnName("id_cargo");
            entity.Property(e => e.nome)
                .HasMaxLength(100)
                .HasColumnName("nome");
            entity.Property(e => e.nome_social)
                .HasMaxLength(50)
                .HasColumnName("nome_social");
            entity.Property(e => e.salario_bruto)
                .HasPrecision(10, 2)
                .HasColumnName("salario_bruto");
            entity.Property(e => e.telefone)
                .HasMaxLength(50)
                .HasColumnName("telefone");

            entity.HasOne(d => d.IdCargoNavigation).WithMany(p => p.Funcionarios)
                .HasForeignKey(d => d.id_cargo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("id_cargo");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
