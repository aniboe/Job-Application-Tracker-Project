import { OAuth2Client } from 'google-auth-library' 

// googole/callback

const redirectUri = process.env.REDIREC_URL || process.env.REDIRECT_URL || process.env.REDIRECION || process.env.REDIRECT_URI || undefined
export const OAuth = new OAuth2Client(
    process.env.CLIENT_ID, // client id
    process.env.CLIENT_SECRET, // client secret
    redirectUri, // redirect uri (supports common env name variants)
)

