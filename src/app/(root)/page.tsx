import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const authenticated = cookies().get("ACCESS_TOKEN");
  if (authenticated) {
    redirect("/articles");
  }
  return redirect("/login");
}
