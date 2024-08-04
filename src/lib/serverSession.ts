import { getServerSession } from "next-auth";

export default async function getSession() {
    const session = await getServerSession();

    if(session) {
        return session;
    } else {
        false;
    }
}