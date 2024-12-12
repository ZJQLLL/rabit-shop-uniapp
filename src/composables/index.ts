import { ref } from "vue"

export const useGuessLikeList = ()=>{
    const guessRef = ref()
    const onScrolltolower = ()=>{
        guessRef.value.getMore()
    }
    return {
        guessRef,
        onScrolltolower
    }
}