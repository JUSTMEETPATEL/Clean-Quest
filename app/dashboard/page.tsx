import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      
    </div>
  );
}
