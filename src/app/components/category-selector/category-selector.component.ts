import { Component, OnInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-selector.component.html',
})
export class CategorySelectorComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private platformId = inject(PLATFORM_ID);

  allCategories = signal<Category[]>([]);
  currentCategories = signal<Category[]>([]);
  historyStack = signal<Category[][]>([]);
  searchTerm = signal<string>('');
  selectedCategoryId = signal<number | null>(null);

  displayCategories = computed(() => {
    const term = this.searchTerm().trim();
    return term
      ? this.categoryService.searchInTree(this.allCategories(), term)
      : this.currentCategories();
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.categoryService.getCategories().subscribe({
        next: (data) => {
          this.allCategories.set(data);
          this.currentCategories.set(data);
        },
        error: (err) => console.error('Error:', err),
      });
    }
  }

  onCategoryClick(cat: Category) {
    if (cat.isLeaf) {
      this.selectedCategoryId.set(cat.id);
    } else if (cat.subcategories) {
      this.selectedCategoryId.set(null);
      this.historyStack.update((stack) => [...stack, this.currentCategories()]);
      this.currentCategories.set(cat.subcategories);
      this.searchTerm.set('');
    }
  }

  goBack() {
    const stack = this.historyStack();
    if (stack.length > 0) {
      this.currentCategories.set(stack[stack.length - 1]);
      this.historyStack.update((s) => s.slice(0, -1));
      this.selectedCategoryId.set(null);
    }
  }

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
