import { db } from "@/lib/db";

export default async function Home() {
    await db.set("hello", "Bilal");
    return <div className="text-red-500">Home</div>;
}
