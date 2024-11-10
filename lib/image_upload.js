import axios from "axios"
export default async function upload_image(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME);
    // console.log(process.env.NEXT_PUBLIC_CLOUDINARY_NAME);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      formData
    );
    const image_url = response.data["secure_url"];
    // console.log(image_url);
    return image_url;
  } catch (error) {
    console.log(error);
    return "";
  }
}