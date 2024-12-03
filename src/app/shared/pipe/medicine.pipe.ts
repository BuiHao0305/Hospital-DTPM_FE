import { Pipe, PipeTransform } from '@angular/core';

export enum MedicineCategory {
  HA_SOT_KHANG_VIEM = 1,
  GIAM_DAU = 2,         
  TIEU_HOA = 3,         
  DA_LIEU = 4,         
  SAT_TRUNG = 5,        
  VITAMIN = 6,          
  KHAC = 0             
}

@Pipe({
  name: 'medicineCategory',
  standalone: true,
})
export class MedicineCategoryPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case MedicineCategory.HA_SOT_KHANG_VIEM:
        return 'Thuốc hạ sốt, kháng viêm';
      case MedicineCategory.GIAM_DAU:
        return 'Thuốc giảm đau';
      case MedicineCategory.TIEU_HOA:
        return 'Thuốc giảm đau';
      case MedicineCategory.DA_LIEU:
        return 'Thuốc da liễu';
      case MedicineCategory.SAT_TRUNG:
        return 'Thuốc sát trùng';
      case MedicineCategory.VITAMIN:
        return 'Vitamin';
      case MedicineCategory.KHAC:
        return 'Loại khác';
      default:
        return 'Chưa xác định';
    }
  }
}
