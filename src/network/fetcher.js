
"use server"

import { deleteToken, saveToken } from "@/mutation/serverActions";
import Cookies from 'js-cookie';  // Import js-cookie to manage cookies on the client
import { cookies } from "next/headers";

export async function customFetch(url, method = "GET", body = null, customHeaders = {}) {

  const token = cookies().get('token');

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token?.value}`,
    ...customHeaders,
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    console.log(response.status, "response.status");

    if (response.status === 401 || !response.ok) {
      return response.status
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
