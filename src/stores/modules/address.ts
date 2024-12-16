import type { MemberAddressListItem } from "@/services/address";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddressStore = defineStore(
    'address',
    ()=>{
        const selectedAddress = ref<MemberAddressListItem>()
        const changeSelectedAddress = (val:MemberAddressListItem)=>{
            selectedAddress.value = val
        }

        return {
            selectedAddress,
            changeSelectedAddress
        }
    }
)