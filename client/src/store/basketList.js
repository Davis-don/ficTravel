import {create} from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const hotelListItinerary = (set,get)=>({
hotelList:[],


addHotelItinerary: (data) => {
    set((state) => ({
        hotelList: [...state.hotelList, data],
    }));
},

})



const usehotelListItinerary = create(devtools(persist(hotelListItinerary, { name: 'hotelList' })));

export default usehotelListItinerary;