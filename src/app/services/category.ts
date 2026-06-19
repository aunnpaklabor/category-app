import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // โหลดข้อมูลจากไฟล์ JSON ใน assets
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/categories.json');
  }

  // ฟังก์ชันค้นหาหมวดหมู่แบบทะลุทุกชั้น
  searchInTree(categories: Category[], query: string): Category[] {
    let results: Category[] = [];
    const lowerQuery = query.toLowerCase();

    for (const cat of categories) {
      if (cat.name.toLowerCase().includes(lowerQuery)) {
        results.push(cat);
      }
      // ถ้ามีลูก ให้ดำน้ำลงไปหาในลูกต่อ
      if (cat.subcategories && cat.subcategories.length > 0) {
        const subResults = this.searchInTree(cat.subcategories, query);
        results = [...results, ...subResults];
      }
    }
    return results;
  }
}