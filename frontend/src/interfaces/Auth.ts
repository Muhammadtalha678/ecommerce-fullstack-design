export interface ApiResponse {
    error: boolean,
    errors: {
        fullname?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
        [key: string]: string | undefined; // for any extra fields
    },
    data: { message?: string, key?: string } | null
} 