import { RadPage } from './app.po';

describe('rad App', () => {
  let page: RadPage;

  beforeEach(() => {
    page = new RadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
