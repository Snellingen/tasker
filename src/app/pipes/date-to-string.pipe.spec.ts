import { DateToStringPipe } from './date-to-string.pipe';

describe('DateToStringPipe', () => {
  it('transforms a date into a short date string based on locale (en-US)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-US';
    const dateStyle = 'short';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('1/1/22');
  });

  it('transforms a date into a short date string based on locale (en-GB)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-GB';
    const dateStyle = 'short';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('01/01/2022');
  });

  it('transforms a date into a short date string based on locale (fr-FR)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'fr-FR';
    const dateStyle = 'short';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('01/01/2022');
  });

  it('transforms a date into a short date string based on locale (no-NO)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'no-NO';
    const dateStyle = 'short';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('01.01.2022');
  });

  it('transforms a date into a full date string based on locale (en-US)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-US';
    const dateStyle = 'full';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('Saturday, January 1, 2022');
  });

  it('transforms a date into a long date string based on locale (en-US)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-US';
    const dateStyle = 'long';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('January 1, 2022');
  });

  it('transforms a date into a medium date string based on locale (en-US)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-US';
    const dateStyle = 'medium';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('Jan 1, 2022');
  });

  it('transforms a date into a full date string based on locale (en-GB)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-GB';
    const dateStyle = 'full';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('Saturday 1 January 2022');
  });

  it('transforms a date into a long date string based on locale (en-GB)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-GB';
    const dateStyle = 'long';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('1 January 2022');
  });

  it('transforms a date into a medium date string based on locale (en-GB)', () => {
    const pipe = new DateToStringPipe();
    const date = new Date('2022-01-01');
    const locale = 'en-GB';
    const dateStyle = 'medium';
    const transformedDate = pipe.transform(date, dateStyle, locale);
    expect(transformedDate).toBe('1 Jan 2022');
  });
});
