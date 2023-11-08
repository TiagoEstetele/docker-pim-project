using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;

namespace TESTE_API.Infraestrutura
{
    public class CalcularSalario
    {
        decimal SalarioBruto { get; set; }

        public void SetSalarioBruto(decimal salario_bruto)
        {
            this.SalarioBruto = salario_bruto;
        }
        public decimal CalcularoIRRF(decimal salarioBruto)
        {
            if (salarioBruto < 2112.01M)
                return 0;
            else if (salarioBruto >= 2112.01M && salarioBruto <= 2826.65M)
                return 158.40M;
            else if (salarioBruto >= 2826.66M && salarioBruto <= 3751.05M)
                return 370.40M;
            else if (salarioBruto >= 3751.05M && salarioBruto <= 4664.68M)
                return 651.73M;
            else
                return 884.96M;
        }
        public decimal CalculoINSS(decimal salarioBruto)
        {
            decimal? porcentagemDesconto = null;
            decimal? valorDesconto = null;

            if (salarioBruto <= 1302)
                porcentagemDesconto = 7.5M;
            else if (salarioBruto >= 1302.01M && salarioBruto <= 2571.29M)
                porcentagemDesconto = 9;
            else if (salarioBruto >= 2571.30M && salarioBruto <= 3856.94M)
                porcentagemDesconto = 12;
            else if (salarioBruto >= 3856.95M && salarioBruto <= 7507.49M)
                porcentagemDesconto = 14;
            else
                valorDesconto = 877.24M;

            if (porcentagemDesconto.HasValue)
                valorDesconto = (porcentagemDesconto / 100) * salarioBruto;

            return valorDesconto.Value;
        }

        public decimal CalculoPorcentagemINSS(decimal salarioBruto)
        {
            decimal salarioDecimal = salarioBruto;
            decimal porcentagemDesconto;

            if (salarioDecimal <= 1302)
                porcentagemDesconto = 7.5M;
            else if (salarioDecimal >= 1302.01M && salarioDecimal <= 2571.29M)
                porcentagemDesconto = 9;
            else if (salarioDecimal >= 2571.30M && salarioDecimal <= 3856.94M)
                porcentagemDesconto = 12;
            else if (salarioDecimal >= 3856.95M && salarioDecimal <= 7507.49M)
                porcentagemDesconto = 14;
            else
                porcentagemDesconto = 877.24M;

            return porcentagemDesconto;
        }

        public decimal PagamentoDia(decimal salarioBruto)
        {
            decimal FaltaDia;
            decimal PagamentoTotal;

            salarioBruto = salarioBruto / 160;
            FaltaDia = salarioBruto * 8;

            return FaltaDia;
        }

        public decimal? PagamentoFalta(decimal salarioBruto, decimal? horas)
        {
            decimal? Falta, HoraExtra, PagamentoTotal, salarioHora;

            salarioHora = salarioBruto / 160;

            PagamentoTotal = horas * salarioHora;
                
            if (horas <= 160)
            {
                Falta = salarioBruto - PagamentoTotal;
            }
            else
            {
                Falta = salarioBruto - PagamentoTotal;
                Falta = 0;
            }


            return Falta;
        }

        public decimal? PagamentoExtra(decimal salarioBruto, decimal? horas)
        {
            decimal? Falta, HoraExtra, PagamentoTotal, salarioHora;

            salarioHora = salarioBruto / 160;

            PagamentoTotal = horas * salarioHora;

            if (horas <= 160)
            {
                HoraExtra = 0;
            }
            else
            {
                Falta = salarioBruto - PagamentoTotal;
                HoraExtra = Falta * -1;
            }


            return HoraExtra;
        }
            public decimal? CalculoSalarioHoras(decimal salarioBruto, decimal? horas)
        {
            decimal? SalarioLiquido, PagamentoTotal;

            salarioBruto = salarioBruto / 160;

            SalarioLiquido = horas * salarioBruto;

            return SalarioLiquido;
        }
    }
}
