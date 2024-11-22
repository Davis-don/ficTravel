import { useQuery } from 'react-query';

const url = 'https://hotels-com-provider.p.rapidapi.com/v2/regions?query=Prag&domain=AR&locale=es_AR';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com'
	}
};

const useHotelBook = () => {
  return useQuery(
    ['hotel-book'], // Cache key for the query
    async () => {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const retryDelay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 10000; // default 10 seconds if no Retry-After header
          console.log(`Rate limit exceeded, retrying after ${retryDelay / 1000} seconds`);
          throw new Error(`Too many requests. Retry after ${retryDelay / 1000} seconds.`);
        }
        throw new Error('Network response was not ok');
      }

      return response.json(); // Parse JSON data
    },
    {
      staleTime: 1000 * 60 * 60, 
      cacheTime: 1000 * 60 * 60 * 24, 
      refetchOnWindowFocus: false, 
      refetchOnMount: false, 
      refetchInterval: false, 
      retry: 3, 
      retryDelay: 2000, 
    }
  );
};

export default useHotelBook;
