import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  if(user.role === "citizen") return redirect("/dashboard/citizen");
  if(user.role === "admin") return redirect("/dashboard/admin");
  if(user.role === "ngo") return redirect("/dashboard/ngo");

  return (
    <div>
      <h1>You are not supposed to be here</h1>
    </div>
  );
}
