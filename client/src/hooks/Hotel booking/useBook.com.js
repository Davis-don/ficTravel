import { useQuery } from 'react-query';

const useHotelBook = () => {
  // API details
  const url =
    'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?id=eyJ1ZmkiOi0yMDkyMTc0fQ%3D%3D&sortBy=trending&page=1&currency_code=INR&languagecode=en-us';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'c0d7a93a7fmsh84a8b9d108ef499p12a38fjsn2784bbe4d192',
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    },
  };

  const fetchHotels = async () => {
    // Check if cached data exists in localStorage
    const storedData = localStorage.getItem('hotels');
    if (storedData) {
      console.log('Using cached data from localStorage');
      return JSON.parse(storedData);
    }

    // Increment and store the API request count
    let requestCount = parseInt(localStorage.getItem('requestCount'), 10) || 0;
    requestCount += 1;
    localStorage.setItem('requestCount', requestCount);

    console.log(`API Request Count: ${requestCount}`);

    // Make the API call
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    // Cache the API response in localStorage
    localStorage.setItem('hotels', JSON.stringify(data));
    return data;
  };

  const { data, error, isLoading } = useQuery(
    ['hotel-book'], // Cache key
    fetchHotels, // Fetch function
    {
      staleTime: Infinity, // Prevent unnecessary refetching
      cacheTime: Infinity, // Cache React Query data indefinitely
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnMount: false, // Disable refetch on mount
      refetchInterval: false, // Disable periodic refetching
      retry: 0, // Do not retry failed requests
    }
  );

  // Retrieve the latest request count from localStorage
  const requestCount = parseInt(localStorage.getItem('requestCount'), 10) || 0;

  return { data, error, isLoading, requestCount };
};

export default useHotelBook;












