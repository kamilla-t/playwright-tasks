import { test, expect } from '@playwright/test';

//devtools > inspect > accessibility > enable 'show accessibility tree'

test('Check form aria snapshot', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/assertions');
  const form = page.getByRole('region', { name: 'Form section' });
  const checkbox = page.getByRole('checkbox', { name: 'I agree' });
  await expect(form).toMatchAriaSnapshot({ name: 'form.aria.yml' });
  await checkbox.check();
  await expect(form).toMatchAriaSnapshot({ name: 'formActiveButton.aria.yml' });
});

test('Check list area', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/assertions');
  await expect(page.getByRole('region', { name: 'List section' })).toMatchAriaSnapshot(`
    - list:
        - /children: equal
        - listitem: Item A 
        - listitem: Item B 
        - listitem: Item C
`);

  await page.getByRole('button', { name: 'Add item' });
  //   await expect(page.getByRole('region', { name: 'List section' })).toMatchAriaSnapshot(`
  //     - list:
  //         - /children: equal
  //         - listitem: Item A
  //         - listitem: Item B
  //         - listitem: Item C
  //         - listitem: Item D
  //     `);
});
