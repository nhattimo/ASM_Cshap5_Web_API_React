using Api_React_Fast_Food_Online.Server.DTOs.CategoryDTO;
using Api_React_Fast_Food_Online.Server.Models;

namespace Api_React_Fast_Food_Online.Server.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                Name = categoryModel.Name
            };
        }

        public static Category ToCategoryFromCreateDto(this CreateCategoryRequestDto categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name
            };
        }

        public static Category ToCategoryFromUpdateDto(this UpdateCategoryRequestDto categoryDto, Category categoryModel)
        {
            categoryModel.Name = categoryDto.Name;
            return categoryModel;
        }
    }
}
