export const creatAuthSlice = (set) => (
    {
        userInfo: undefined,
        setUserInfo:(userInfo) => set({userInfo}) ,
        clearAuth:() => 
            set({userInfo: null})
        
    }
)