using System;
using System.Collections.Generic;

namespace TESTE_API.Entities;

public partial class Cargo
{
    public int Id { get; set; }

    public string? Nome { get; set; }

    public virtual ICollection<Funcionarios> Funcionarios { get; set; } = new List<Funcionarios>();
}
