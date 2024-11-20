import {create} from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const userStore= (set)=>({
    user:[],

  addUser:(data)=>{
    //add user now
    set((state)=>({user:[data]}))

  }
})

const useUserStore = create(devtools(persist(userStore,{name:'user'})))

export default useUserStore;