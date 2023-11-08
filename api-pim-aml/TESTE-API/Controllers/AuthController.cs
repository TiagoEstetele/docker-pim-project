using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TESTE_API.Entities;
using TESTE_API.Infraestrutura;
using TESTE_API.Model;

namespace TESTE_API.Controllers
{
    public class AuthController : Controller
    {
        private FuncionarioRepository funcionarioRepository;

        public AuthController(FuncionarioRepository _funcionarioRepository)
        {
            funcionarioRepository = _funcionarioRepository;
        }
        [HttpPost]
        [Route("auth")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] LoginRequest model)
        {
            // Recupera o usuário
            var user = funcionarioRepository.GetByEmail(model.Username);

            // Verifica se o usuário existe
            if (user == null || user.cpf != model.Password)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Retorna os dados
            return new
            {
                user = new
                {
                    Id = user.id_funcionario,
                    Name = user.nome, 
                    Email = user.email
                },
                token = token
            };
        }
    }
}
