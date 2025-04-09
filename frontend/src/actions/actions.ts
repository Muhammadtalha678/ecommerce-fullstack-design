'use server'
export const handleRegister = async (formData: FormData) => {
    const registerData = {
        fullname: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }
    console.log(registerData);

}