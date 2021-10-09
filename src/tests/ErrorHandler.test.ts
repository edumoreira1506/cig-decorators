import { ErrorHandler } from '..';

describe('Repository decorators', () => {
  describe('ErrorHandler', () => {
    it('returns the value when trigger an error', () => {
      const value = 'example';
      class ExampleClass {
        @ErrorHandler(value)
        static functionWithError() {
          throw new Error('error example');
        }
      }

      expect(ExampleClass.functionWithError()).toBe(value);
    });

    it('returns undefined when trigger an error in a promise', async () => {
      const value = 'another value';
      class ExampleClass {
        @ErrorHandler(value)
        static functionWithError() {
          return new Promise((_, reject) => reject(new Error('error example')));
        }
      }

      expect(await ExampleClass.functionWithError()).toBe(value);
    });
  });
});
