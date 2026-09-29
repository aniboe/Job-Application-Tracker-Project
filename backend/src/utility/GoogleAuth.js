import { OAuth2Client } from 'google-auth-library' 

// googole/callback

export const OAuth = new OAuth2Client(
    process.env.CLIENT_ID, // client id
    process.env.CLIENT_SECRET, // client secret
    process.env.REDIREC_URL, // redirect uri
)

