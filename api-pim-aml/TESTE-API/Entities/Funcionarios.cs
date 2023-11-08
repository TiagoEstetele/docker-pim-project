using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TESTE_API.Entities;

namespace TESTE_API.Entities;

public class Funcionarios
{
    public int id_funcionario { get; set; }

    public int id_cargo { get; set; }

    public string telefone { get; set; } = null!;

    public string endereco { get; set; } = null!;

    public string nome { get; set; } = null!;

    public DateOnly data_admissao { get; set; }

    public string ctps { get; set; } = null!;

    public decimal salario_bruto { get; set; }

    public DateOnly data_nascimento { get; set; }

    public string banco { get; set; } = null!;

    public string conta { get; set; } = null!;

    public string cpf { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool ativo { get; set; }

    public string? nome_social { get; set; }

    public string? genero { get; set; }

    public virtual ICollection<ControleDeHora> ControleDeHoras { get; set; } = new List<ControleDeHora>();

    public virtual Cargo IdCargoNavigation { get; set; } = null!;

    public Funcionarios(int id_funcionario, int id_cargo, string nome, string telefone, DateOnly data_admissao, string ctps, decimal salario_bruto, DateOnly data_nascimento, string banco, string conta, string cpf, string email, bool ativo, string nome_social, string genero, string endereco)
    {
        this.id_funcionario = id_funcionario;
        this.id_cargo = id_cargo;
        this.nome = nome;
        this.telefone = telefone;
        this.data_admissao = data_admissao;
        this.ctps = ctps;
        this.salario_bruto = salario_bruto;
        this.data_nascimento = data_nascimento;
        this.banco = banco;
        this.conta = conta;
        this.cpf = cpf;
        this.email = email;
        this.ativo = ativo;
        this.nome_social = nome_social;
        this.genero = genero;
        this.endereco = endereco;
    }
}

