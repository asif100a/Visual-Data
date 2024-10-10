import axios from "axios";

const useUploadImage = () => {
    // Image hosting url
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`

    const handleUploadImage = async (tokenPhoto) => {
        // console.log(tokenPhoto);
        const formData = new FormData();
        formData.append('image', tokenPhoto)

        const { data } = await axios.post(imageHostingUrl, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        return data;
    };
    
    return handleUploadImage;
};

export default useUploadImage;