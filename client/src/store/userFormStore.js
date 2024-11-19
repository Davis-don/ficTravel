import {create} from 'zustand'

const useFormStore = create((set)=>({
    formDisplay:false,
    
    toggleForm:()=>{
        set((state)=>({
            formDisplay:!state.formDisplay
        }))
    }
}))


export default useFormStore