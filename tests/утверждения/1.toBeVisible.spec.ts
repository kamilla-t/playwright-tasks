import { test, expect } from '@playwright/test';

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"

    const el = page.locator('#always-visible');
    await expect(el).toBeVisible();
    await expect(el).toHaveText('Всегда видимый элемент');
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()

    const displayEl = page.locator('#toggle-display');
    const visibilityEl = page.locator('#toggle-visibility');
    const opacityEl = page.locator('#toggle-opacity');

    await expect(displayEl).not.toBeVisible();
    await expect(visibilityEl).not.toBeVisible();
    await expect(opacityEl).toBeVisible();

    await expect(displayEl).toHaveCSS('display', 'none');
    await expect(visibilityEl).toHaveCSS('visibility', 'hidden');
    await expect(opacityEl).toHaveCSS('opacity', '0');
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1

    await page.locator('#show-display').click();
    await expect(page.locator('#toggle-display')).toBeVisible();
    await expect(page.locator('#toggle-display')).toHaveCSS('display', 'block');

    await page.locator('#show-visibility').click();
    await expect(page.locator('#toggle-visibility')).toBeVisible();
    await expect(page.locator('#toggle-visibility')).toHaveCSS('visibility', 'visible');

    await page.locator('#show-opacity').click();
    await expect(page.locator('#toggle-opacity')).toBeVisible();
    await expect(page.locator('#toggle-opacity')).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"

    const delayedEl = page.locator('#delayed-element');
    const delayedBtn = page.locator('#show-delayed ');

    await expect(delayedEl).not.toBeVisible();
    await delayedBtn.click();
    await expect(delayedEl).toBeVisible({ timeout: 3000 });
    await expect(delayedEl).toHaveText('Элемент с задержкой появления');
  });
});
