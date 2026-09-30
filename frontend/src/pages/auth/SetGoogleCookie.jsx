import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { api } from "../../main"

function SetGoogleCookie() {
    const [searchParams] = useSearchParams()
    const Navigate = useNavigate()

    useEffect(() => {

        const token = searchParams.get('token')
        // console.log("frontend recieved token: ", token);
        
        if(token){
            api.post('/user/google/set-cookie',{token})
            .then(() => {
                setTimeout(() => {
                    Navigate('/dashboard')
                }, 1500)
                
            })
            .catch((err) => {
                throw new Error("something went wrong while authenticating user")
                Navigate('/')
            })
        }

    },[])
    
    return (
        <div className="h-screen flex justify-center items-center text-black dark:text-white">
            <h2>Authenticating, please wait...</h2>
        </div>
    )
}

export default SetGoogleCookie