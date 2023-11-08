using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TESTE_API.Entities;
using TESTE_API.Model;
using TESTE_API.ViewModel;

namespace TESTE_API.Controllers
{
    [ApiController]
    [Route("api/v1/funcionarios")]
    public class FuncionariosController : ControllerBase
    {
        private readonly IFuncionariosRepository _funcionariosRepository;

        public FuncionariosController(IFuncionariosRepository funcionariosRepository)
        {
            _funcionariosRepository = funcionariosRepository;
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Add(FuncionariosViewModel funcionariosView)
        {
            var funcionarios = new Entities.Funcionarios(funcionariosView.id_funcionario, funcionariosView.id_cargo, funcionariosView.nome, funcionariosView.telefone, funcionariosView.data_admissao, funcionariosView.ctps, funcionariosView.salario_bruto, funcionariosView.data_nascimento, funcionariosView.banco, funcionariosView.conta, funcionariosView.cpf, funcionariosView.email, funcionariosView.ativo, funcionariosView.nome_social, funcionariosView.genero, funcionariosView.endereco);
            _funcionariosRepository.Add(funcionarios);

            return Ok(); 
        }

        [HttpGet]
        public IActionResult Get()
        {
            var funcionarios = _funcionariosRepository.Get();

            return Ok(funcionarios);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var funcionario = _funcionariosRepository.GetById(id);

            return Ok(funcionario);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _funcionariosRepository.Delete(id);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, FuncionariosViewModel funcionariosView)
        {
            var funcionario = new Entities.Funcionarios(funcionariosView.id_funcionario, funcionariosView.id_cargo, funcionariosView.nome, funcionariosView.telefone, funcionariosView.data_admissao, funcionariosView.ctps, funcionariosView.salario_bruto, funcionariosView.data_nascimento, funcionariosView.banco, funcionariosView.conta, funcionariosView.cpf, funcionariosView.email, funcionariosView.ativo, funcionariosView.nome_social, funcionariosView.genero, funcionariosView.endereco);

            // Defina o ID do funcionário com base no parâmetro da rota.
            funcionario.id_funcionario = id;

            _funcionariosRepository.Update(funcionario);

            return Ok(); // Retorna o funcionário atualizado.
        }



    }
}
