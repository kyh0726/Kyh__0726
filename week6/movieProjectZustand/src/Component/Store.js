import { create } from "zustand";

    const useStore = create(set => ({
        movies: [],
        
    }))



export default useStore