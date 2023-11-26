using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TESTE_API.ViewModel
{
    public class ControleDeHorasInputModel
    {
        public int IdFuncionario { get; set; }
        public int Mes { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
    }
}
