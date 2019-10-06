import { MyAppFormPage } from './app.po';

describe('my-app-form App', () => {
  let page: MyAppFormPage;

  beforeEach(() => {
    page = new MyAppFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
