type HttpMethods = 'GET' | 'POST' | 'DELETE';

interface APIOptions {
  method?: HttpMethods;
  body?: string;
  token?: string;
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const createAPI = <FormBody>(endpoint: string, options: APIOptions) => {
   return  (
      async (body: FormBody) => {

          // body ? (options.body = JSON.stringify(body)) : undefined;
          const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
          return fetch(`http://localhost:5000/${endpoint}`, {
            method: options.method ?? 'GET',
            headers,
            body: options.body,
          })
      }
  )
}
