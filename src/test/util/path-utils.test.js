import { isTopPage, isDeletablePage, isCreatablePage } from '~/utils/path-utils';


describe('TopPage Path test', () => {
  test('Path is only "/"', () => {
    const result = isTopPage('/');
    expect(result).toBe(true);
  });
  test('Path is not match string ', () => {
    const result = isTopPage('/test');
    expect(result).toBe(false);
  });
  test('Path is integer', () => {
    const result = isTopPage(1);
    expect(result).toBe(false);
  });
  test('Path is null', () => {
    const result = isTopPage(null);
    expect(result).toBe(false);
  });
});


describe('.isDeletableName', () => {
  test('should decide deletable or not', () => {
    expect(isDeletablePage('/hoge')).toBeTruthy();
    expect(isDeletablePage('/user/xxx')).toBeFalsy();
    expect(isDeletablePage('/user/xxx123')).toBeFalsy();
    expect(isDeletablePage('/user/xxx/')).toBeTruthy();
    expect(isDeletablePage('/user/xxx/hoge')).toBeTruthy();
  });
});

describe('.isCreatableName', () => {
  test('should decide creatable or not', () => {
    expect(isCreatablePage('/hoge')).toBeTruthy();

    // edge cases
    expect(isCreatablePage('/me')).toBeFalsy();
    expect(isCreatablePage('/me/')).toBeFalsy();
    expect(isCreatablePage('/me/x')).toBeFalsy();
    expect(isCreatablePage('/meeting')).toBeTruthy();
    expect(isCreatablePage('/meeting/x')).toBeTruthy();

    // end with "edit"
    expect(isCreatablePage('/meeting/edit')).toBeFalsy();

    // under score
    expect(isCreatablePage('/_')).toBeTruthy();
    expect(isCreatablePage('/_template')).toBeTruthy();
    expect(isCreatablePage('/__template')).toBeTruthy();
    expect(isCreatablePage('/_r/x')).toBeFalsy();
    expect(isCreatablePage('/_api')).toBeFalsy();
    expect(isCreatablePage('/_apix')).toBeFalsy();
    expect(isCreatablePage('/_api/x')).toBeFalsy();

    expect(isCreatablePage('/hoge/xx.md')).toBeFalsy();

    // start with https?
    expect(isCreatablePage('/http://demo.growi.org/hoge')).toBeFalsy();
    expect(isCreatablePage('/https://demo.growi.org/hoge')).toBeFalsy();
    expect(isCreatablePage('http://demo.growi.org/hoge')).toBeFalsy();
    expect(isCreatablePage('https://demo.growi.org/hoge')).toBeFalsy();

    expect(isCreatablePage('/ the / path / with / space')).toBeFalsy();

    const forbidden = ['installer', 'register', 'login', 'logout',
                       'admin', 'files', 'trash', 'paste', 'comments'];
    for (let i = 0; i < forbidden.length; i++) {
      const pn = forbidden[i];
      expect(isCreatablePage(`/${pn}`)).toBeFalsy();
      expect(isCreatablePage(`/${pn}/`)).toBeFalsy();
      expect(isCreatablePage(`/${pn}/abc`)).toBeFalsy();
    }
  });
});
