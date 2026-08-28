import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

function uploadOnCloudinary(localPath){

  return cloudinary.uploader.upload(localPath, {
    resource_type: "image", 
    // public_id: "my_dog",
    // overwrite: true, 
    // notification_url: "https://mysite.example.com/notify_endpoint"
    })
  .then((result) => {
    fs.unlinkSync(localPath)
    return result /*  this alone return doesnt work because it return back to .then and not to invocked function in another file,
                      then the value passed in ".then" is then returned by "return" in return its is returned to whoever invoked function
                  */
  })
  .catch((error) => {
    fs.unlinkSync(localPath)
    console.error("somehing went wrong while uploading to cloudinary : ",error)
  })
}

function deleteFromCloudinary(imageUrl){

  return cloudinary.uploader.destroy(imageUrl, 
    {resource_type: 'image'}
  )
  .then((result) => {
    console.log("avatar removed successfully")
    return result
  })
  .catch ((error) => {
    console.error(error)
  })
}


export { 
  uploadOnCloudinary,
  deleteFromCloudinary,
}