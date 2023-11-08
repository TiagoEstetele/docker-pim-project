using TESTE_API.Entities;

namespace TESTE_API.Model
{
    public interface IFuncionariosRepository
    {
        void Add(Entities.Funcionarios funcionarios);
        void Delete(int id);
        Entities.Funcionarios GetByEmail(string email);
        Entities.Funcionarios GetById(int id);
        List<Entities.Funcionarios> Get();
        void Update(Entities.Funcionarios funcionario);
    }
}
