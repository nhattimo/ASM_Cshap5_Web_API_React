using Api_React_Fast_Food_Online.Server.DTOs.CategoryDTO;
using Api_React_Fast_Food_Online.Server.Models;

namespace Api_React_Fast_Food_Online.Server.Interfaces
{
    public interface ICategoryInterface
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category> CreateAsync(Category categoryModel);
        Task<Category?> UpdateAsync(int id, UpdateCategoryRequestDto categoryDto);
        Task<Category?> DeleteAsync(int id);
        Task<bool> CategoryExists(int id);
    }
}
