using Api_React_Fast_Food_Online.Server.DTOs.Supplier;
using Api_React_Fast_Food_Online.Server.Models;

namespace Api_React_Fast_Food_Online.Server.Interfaces
{
    public interface ISupplierInterface
    {
        Task<List<Supplier>> GetAllAsync();
        Task<Supplier?> GetByIdAsync(int id);
        Task<Supplier> CreateAsync(Supplier supplierModel);
        Task<Supplier?> UpdateAsync(int id, UpdateSupplierRequestDto supplierDto);
        Task<Supplier?> DeleteAsync(int id);
        Task<bool> SupplierExists(int id);
    }
}