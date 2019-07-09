import { newE2EPage } from '@stencil/core/testing';

describe('whiskey-home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<whiskey-home></whiskey-home>');

    const element = await page.find('whiskey-home');
    expect(element).toHaveClass('hydrated');
  });
});
