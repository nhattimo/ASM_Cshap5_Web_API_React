using Api_React_Fast_Food_Online.Server.Data;
using Api_React_Fast_Food_Online.Server.DTOs.Supplier;
using Api_React_Fast_Food_Online.Server.Interfaces;
using Api_React_Fast_Food_Online.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Api_React_Fast_Food_Online.Server.Services
{
    public class SupplierServices : ISupplierInterface
    {
        private readonly ApplicationDbContext _context;

        public SupplierServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Supplier>> GetAllAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier?> GetByIdAsync(int id)
        {
            return await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Supplier> CreateAsync(Supplier supplierModel)
        {
            await _context.Suppliers.AddAsync(supplierModel);
            await _context.SaveChangesAsync();
            return supplierModel;
        }

        public Task<bool> SupplierExists(int id)
        {
            return _context.Suppliers.AnyAsync(s => s.Id == id);
        }

        public async Task<Supplier?> UpdateAsync(int id, UpdateSupplierRequestDto supplierDto)
        {
            var existingSupplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id);

            if (existingSupplier == null)
                return null;

            existingSupplier.Name = supplierDto.Name;
            existingSupplier.Company = supplierDto.Company;

            await _context.SaveChangesAsync();

            return existingSupplier;
        }

        public async Task<Supplier?> DeleteAsync(int id)
        {
            var supplierModel = await _context.Suppliers.FirstOrDefaultAsync(s => s.Id == id);
            if (supplierModel == null)
            {
                return null;
            }
            _context.Suppliers.Remove(supplierModel);
            await _context.SaveChangesAsync();
            return supplierModel;
        }


    }
}
