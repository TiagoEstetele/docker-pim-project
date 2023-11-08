using System;
using System.Collections.Generic;

namespace TESTE_API.Entities;

public partial class ControleDeHora
{
    public int Id { get; set; }

    public int? IdFuncionario { get; set; }

    public int? Mes { get; set; }

    public DateTime? DataEntrada { get; set; }

    public DateTime? DataSaida { get; set; }

    public decimal? HorasTotal { get; set; }

    public virtual Funcionarios? IdFuncionarioNavigation { get; set; }
}
