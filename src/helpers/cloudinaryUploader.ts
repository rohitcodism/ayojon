import Cloudinary from "@/lib/cloudinary"

export const cloudinaryUploader = async(profilePicture: File) => {
    const bytes = await profilePicture.arrayBuffer()

    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
        Cloudinary.uploader.upload_stream(
            {
                folder: "Ayojon/user_profiles",
                resource_type: "image"
            },
            (error,result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            }
        ).end(buffer)
    })

    return ( result as any ).secure_url
}