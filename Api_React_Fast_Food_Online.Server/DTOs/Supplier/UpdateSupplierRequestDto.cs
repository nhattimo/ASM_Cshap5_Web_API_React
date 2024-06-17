using System.ComponentModel.DataAnnotations;

namespace Api_React_Fast_Food_Online.Server.DTOs.Supplier
{
    public class UpdateSupplierRequestDto
    {
        // Name of the supplier
        [Required, MaxLength(100)]
        public string Name { get; set; }

        // Company of the supplier
        [Required, MaxLength(100)]
        public string Company { get; set; }
    }
}