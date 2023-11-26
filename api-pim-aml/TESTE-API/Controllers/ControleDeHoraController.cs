using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Net.WebSockets;
using TESTE_API.Entities;
using TESTE_API.Infraestrutura;
using TESTE_API.Model;
using TESTE_API.ViewModel;

namespace TESTE_API.Controllers
{
    [ApiController]
    [Route("controle-de-horas")]
    public class ControleDeHoraController : ControllerBase
    {
        private FuncionarioRepository funcionarioRepository;
        private PostgressContext _context = new PostgressContext();

        public ControleDeHoraController(FuncionarioRepository _funcionarioRepository)
        {
            funcionarioRepository = _funcionarioRepository;
        }
        [HttpPost]
        public ActionResult PostControleDeHoras([FromBody] ControleDeHorasInputModel input)
        {
            // Cálculo das horas totais
            TimeSpan horasTotais = input.DataSaida.Date - input.DataEntrada.Date;
            decimal horasTotaisDecimal = (decimal)horasTotais.TotalHours;

            // Inserção dos dados no banco de dados
            var controleDeHoras = new ControleDeHora
            {
                IdFuncionario = input.IdFuncionario,
                Mes = input.Mes,
                DataEntrada = input.DataEntrada.Date,
                DataSaida = input.DataSaida.Date,
                HorasTotal = horasTotaisDecimal
            };

            PostgressContext context = new PostgressContext();
            context.ControleDeHoras.Add(controleDeHoras);
            context.SaveChanges();

            return Ok();
        }

        [HttpGet("{id}/{mes}")]
        public IActionResult ConsultarSalario(int id, int mes)
        {
            CalcularSalario calc = new CalcularSalario();
            var salario = funcionarioRepository.GetSalarioById(id);
            decimal? horas = _context.ControleDeHoras.Where(x => x.IdFuncionario == id && x.Mes == mes).Sum(x => x.HorasTotal);

            var IRRF = calc.CalcularoIRRF(salario);
            var INNS = calc.CalculoINSS(salario);
            var PorcentagemINNS = calc.CalculoPorcentagemINSS(salario);
            var FaltaDia = calc.PagamentoDia(salario);
            var Falta = calc.PagamentoFalta(salario, horas);
            var SalarioLiquido = calc.CalculoSalarioHoras(salario, horas);
            var HoraExtra = calc.PagamentoExtra(salario, horas);
            var Descontos = IRRF + INNS + Falta;
            var salarioRecebido = (salario + HoraExtra) - Descontos;

            var resultado = new
            {
                Salario = salario,
                IRRF = IRRF,
                INSS = INNS,
                PorcentagemINSS = PorcentagemINNS,
                PagamentoDia = FaltaDia,
                DescontoTotalFaltas = Falta,
                SalarioLiquido = SalarioLiquido,
                PagamentoHorasExtra = HoraExtra,
                SalarioRecebido = salarioRecebido,
            };

            return Ok(resultado);
        }
    }
}

