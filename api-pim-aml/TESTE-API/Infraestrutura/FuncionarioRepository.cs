using TESTE_API.Entities;
using TESTE_API.Model;

namespace TESTE_API.Infraestrutura
{
    public class FuncionarioRepository : IFuncionariosRepository
    {

        private readonly PostgressContext _context = new PostgressContext();
        public void Add(Entities.Funcionarios funcionarios)
        {
            _context.Funcionarios.Add(funcionarios);
            _context.SaveChanges();
        }
        public List<Entities.Funcionarios?> Get()
        {
            return _context.Funcionarios.ToList();
        }
        public Entities.Funcionarios? GetByEmail(string email)
        {
            return _context.Funcionarios.FirstOrDefault(f => f.email == email);
        }

        public Entities.Funcionarios GetById(int id)
        {
            return _context.Funcionarios.FirstOrDefault(f => f.id_funcionario == id);
        }
        public decimal GetSalarioById(int id)
        {
            return _context.Funcionarios.Where(f => f.id_funcionario == id).Select(x => x.salario_bruto).FirstOrDefault();
        }

        public void Delete(int funcionarioId)
        {
            var funcionarioToDelete = _context.Funcionarios.Find(funcionarioId);

            if (funcionarioToDelete != null)
            {
                _context.Funcionarios.Remove(funcionarioToDelete);
                _context.SaveChanges();
            }
        }

        public void Update(Entities.Funcionarios funcionario)
        {
            var existingFuncionario = _context.Funcionarios.Find(funcionario.id_funcionario);

            if (existingFuncionario != null)
            {
                existingFuncionario.id_funcionario = funcionario.id_funcionario;
                existingFuncionario.id_cargo = funcionario.id_cargo;
                existingFuncionario.nome = funcionario.nome;
                existingFuncionario.telefone = funcionario.telefone;
                existingFuncionario.data_admissao = funcionario.data_admissao;
                existingFuncionario.ctps = funcionario.ctps;
                existingFuncionario.salario_bruto = funcionario.salario_bruto;
                existingFuncionario.data_nascimento = funcionario.data_nascimento;
                existingFuncionario.banco = funcionario.banco;
                existingFuncionario.conta = funcionario.conta;
                existingFuncionario.cpf = funcionario.cpf;
                existingFuncionario.email = funcionario.email;
                existingFuncionario.ativo = funcionario.ativo;
                existingFuncionario.nome_social = funcionario.nome_social;
                existingFuncionario.genero = funcionario.genero;
                existingFuncionario.endereco = funcionario.endereco;

                _context.SaveChanges();
            }
        }
    }
}
