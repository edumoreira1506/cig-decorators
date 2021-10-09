import axios from 'axios';

export const RequestErrorHandler = (returnedValue?: unknown) => {
  return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);
                
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          return result.catch((error: any) => {
            if (axios.isAxiosError(error))  {
              const response = error?.response?.data ?? {} as any;

              throw response?.error;
            }
      
            return returnedValue;
          });
        }

        return result;
      } catch (error) {
        if (axios.isAxiosError(error))  {
          const response = error?.response?.data ?? {} as any;
  
          throw response?.error;
        }
  
        return returnedValue;
      }
    };

    return descriptor;
  };
};
