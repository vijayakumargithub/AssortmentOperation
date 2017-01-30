import { AssortPage } from './app.po';

describe('assort App', function() {
  let page: AssortPage;

  beforeEach(() => {
    page = new AssortPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
