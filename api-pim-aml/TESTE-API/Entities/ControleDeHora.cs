using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TESTE_API.Entities;

public partial class ControleDeHora
{
    public int Id { get; set; }

    public int? IdFuncionario { get; set; }

    public int? Mes { get; set; }

    [Column(TypeName = "timestamp with time zone")]
    public DateTime? DataEntrada { get; set; }

    [Column(TypeName = "timestamp with time zone")]
    public DateTime? DataSaida { get; set; }

    public decimal? HorasTotal { get; set; }

    public virtual Funcionarios? IdFuncionarioNavigation { get; set; }
}
