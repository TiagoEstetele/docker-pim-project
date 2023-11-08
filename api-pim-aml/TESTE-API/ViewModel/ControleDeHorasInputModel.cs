using System.ComponentModel.DataAnnotations;

namespace TESTE_API.ViewModel
{
    public class ControleDeHorasInputModel
    {
        public int IdFuncionario { get; set; }
        public int Mes { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DataEntrada { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DataSaida { get; set; }
    }
}
