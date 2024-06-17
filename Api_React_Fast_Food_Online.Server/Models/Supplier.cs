using System.ComponentModel.DataAnnotations;

namespace Api_React_Fast_Food_Online.Server.Models
{
    public class Supplier
    {
        // Primary key
        public int Id { get; set; }

        // Name of the supplier
        [Required, MaxLength(100)]
        public string Name { get; set; }

        // Company of the supplier
        [Required, MaxLength(100)]
        public string Company { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}