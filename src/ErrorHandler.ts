export const ErrorHandler = (returnedValue?: unknown) => {
  return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);
                
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          return result.catch(() => returnedValue);
        }

        return result;
      } catch (error) {
        return returnedValue;
      }
    };

    return descriptor;
  };
};
