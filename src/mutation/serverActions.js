"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function saveToken(value) {
    const cookieStore = await cookies()
    cookieStore.set({
        name: 'token', // Use a clear name like 'token'
        value,          // The token value to store
        httpOnly: true, // Prevent access via JavaScript
        path: '/', // Ensure the cookie is available site-wide
    })
}

export async function deleteToken() {
    cookies().delete("token", {
        path: "/", // Ensure the cookie is removed globally
    });
    console.log("Token successfully deleted.");
}
export async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')
}
