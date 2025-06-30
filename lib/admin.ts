import { auth } from "@clerk/nextjs/server";

export const isAdmin = async () => {
    const { userId } = await auth();

    return userId === "user_2vUL9AokFJhIVLYg0rXS9Jk8eT6" 
}