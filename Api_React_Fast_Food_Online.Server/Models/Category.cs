using System.ComponentModel.DataAnnotations;

namespace Api_React_Fast_Food_Online.Server.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }
    }
}