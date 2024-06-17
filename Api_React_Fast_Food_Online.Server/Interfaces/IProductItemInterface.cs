using Api_React_Fast_Food_Online.Server.DTOs.ProductItemDTO;
using Api_React_Fast_Food_Online.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api_React_Fast_Food_Online.Server.Interfaces
{
    public interface IProductItemInterface
    {
        Task<List<ProductItem>> GetAllAsync();
        Task<ProductItem?> GetByIdAsync(int id);
        Task<ProductItem> CreateAsync(ProductItem productItemModel);
        Task<ProductItem?> UpdateAsync(int id, UpdateProductItemRequestDto productItemDto);
        Task<ProductItem?> DeleteAsync(int id);
        Task<bool> ProductItemExists(int id);
    }
}
