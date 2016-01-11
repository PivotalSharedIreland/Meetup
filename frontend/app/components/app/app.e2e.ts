describe('App', function () {

  beforeEach(function () {
    browser.get('/dist/dev');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Meetup finder');
  });

  it('should display search form on the home page', function () {
    expect(element.all(by.css('input')).count()).toEqual(1);
    expect(element.all(by.css('select')).count()).toEqual(1);
    expect(element(by.css('body')).getText()).toContain('City');
    expect(element(by.css('body')).getText()).toContain('Country');
  });

  it('should display the meetup list', function () {
    element.all(by.css('input')).sendKeys('Dublin');
    element.all(by.css('.btn')).click();
    expect(element.all(by.css('li')).count()).toBeGreaterThan(0);
    expect(element(by.css('body')).getText()).toContain('Meaning of life - meaning-life');
  });
});
