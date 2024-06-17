namespace Api_React_Fast_Food_Online.Server.DTOs.ProductItemDTO
{
    public class CreateProductItemRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
       
        public decimal Rating { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public int SupplierId { get; set; }
    }
}
