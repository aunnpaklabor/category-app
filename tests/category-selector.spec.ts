import { test, expect } from '@playwright/test';

// สมมติว่าโปรเจกต์ Angular รันอยู่ที่พอร์ต 4200
const APP_URL = 'http://localhost:4200';

test.describe('Category Selector Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('TC01: ควรแสดงหน้าจอเริ่มต้นและหมวดหมู่หลักได้ถูกต้อง', async ({ page }) => {
    // ตรวจสอบหัวข้อฝั่งขวา (อัปเดตตาม HTML ใหม่)
    await expect(page.getByRole('heading', { name: 'Selected Category' })).toBeVisible();

    // ตรวจสอบ Empty State ฝั่งขวา (อัปเดตคำตาม HTML ใหม่)
    await expect(page.getByText('Please select a leaf category')).toBeVisible();

    // ตรวจสอบว่ามีหมวดหมู่หลักโหลดขึ้นมาโชว์
    await expect(page.getByText('กระเป๋า & กระเป๋าเดินทาง')).toBeVisible();
    
    // ตรวจสอบว่ามี Subtitle กำกับสถานะ (ของใหม่ที่เพิ่งเพิ่มไป)
    await expect(page.getByText('Category Group').first()).toBeVisible();
  });

  test('TC02: ควรสามารถกดเข้าไปดูหมวดหมู่ย่อย (Drill-down) และกดย้อนกลับได้', async ({ page }) => {
    // 1. กดที่หมวดหมู่หลัก
    await page.getByText('กระเป๋า & กระเป๋าเดินทาง').click();

    // 2. ตรวจสอบว่าเจอหมวดหมู่ย่อย
    await expect(page.getByText('กระเป๋าเด็ก')).toBeVisible();

    // 3. ปุ่ม Back ต้องปรากฏขึ้นมา (อัปเดตชื่อปุ่มตาม HTML ใหม่)
    const backButton = page.getByRole('button', { name: 'Back' });
    await expect(backButton).toBeVisible();
    await backButton.click();

    // 4. ต้องกลับมาหน้าแรก และปุ่ม Back ต้องหายไป
    await expect(page.getByText('กระเป๋า & กระเป๋าเดินทาง')).toBeVisible();
    await expect(backButton).toBeHidden();
  });

  test('TC03: ควรสามารถค้นหาหมวดหมู่ได้', async ({ page }) => {
    // ช่องค้นหา (อัปเดต Placeholder ตาม HTML ใหม่)
    const searchInput = page.getByPlaceholder('Search categories...');
    
    // 1. พิมพ์คำค้นหา
    await searchInput.fill('นาฬิกาแฟชั่น');

    // 2. ต้องเจอผลลัพธ์ที่ค้นหา
    await expect(page.getByText('นาฬิกาแฟชั่น').first()).toBeVisible();
    
    // 3. ต้องมี Badge บอกว่าเป็นข้อมูลที่เลือกได้
    await expect(page.getByText('ID: 3288')).toBeVisible();
  });

  test('TC04: เมื่อเลือกหมวดหมู่ย่อยสุด ฝั่งผลลัพธ์ต้องแสดง ID ที่ถูกต้อง', async ({ page }) => {
    // กดเลือกหมวดหมู่ที่ไม่มีลูก
    await page.getByText('อื่นๆ').click();

    // ตรวจสอบว่าฝั่งขวาต้องแสดง Label Category ID
    await expect(page.getByText('Category ID', { exact: true })).toBeVisible();
    
    // ID ต้องเป็น 999999 (หาจากคลาส font-mono ที่ครอบตัวเลขไว้)
    await expect(page.locator('.font-mono')).toHaveText('999999');

    // ปุ่ม Save & Continue ต้องโผล่ขึ้นมาให้กดได้
    await expect(page.getByRole('button', { name: 'Save & Continue' })).toBeVisible();
  });

});