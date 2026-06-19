import { Routes } from '@angular/router';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategorySelectorComponent }, // ชี้ตรงมาเลย ไม่ต้องมี page คั่น
];
