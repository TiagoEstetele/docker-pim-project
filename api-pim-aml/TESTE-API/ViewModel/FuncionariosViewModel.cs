using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace TESTE_API.ViewModel
{
    public class FuncionariosViewModel
    {
        public int id_funcionario { get; set; }
        public int id_cargo { get; set; }
        public string nome { get; set; }
        public string telefone { get; set; }

        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly data_admissao { get; set; }
        public string ctps { get; set; }
        public decimal salario_bruto { get; set; }

        [JsonConverter(typeof(DateOnlyConverter))]
        public DateOnly data_nascimento { get; set; }
        public string banco { get; set; }
        public string conta { get; set; }
        public string cpf { get; set; }
        public string email { get; set; }
        public bool ativo { get; set; }
        public string nome_social { get; set; }
        public string genero { get; set; } 
        public string endereco { get; set; }
    }

    public class DateOnlyConverter : JsonConverter<DateOnly>
    {
        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var dateObject = JsonSerializer.Deserialize<DateObject>(ref reader, options);
            return new DateOnly(dateObject.year, dateObject.month, dateObject.day);
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            var dateObject = new DateObject
            {
                year = value.Year,
                month = value.Month,
                day = value.Day
            };
            JsonSerializer.Serialize(writer, dateObject, options);
        }

        private class DateObject
        {
            public int year { get; set; }
            public int month { get; set; }
            public int day { get; set; }
        }
    }
}
