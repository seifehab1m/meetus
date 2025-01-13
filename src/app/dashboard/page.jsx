import { deleteToo } from "@/components/deleteToo";
import Logout from "@/components/Logout";
import { deleteCookie, deleteToken, saveToken } from "@/mutation/serverActions";
import { customFetch } from "@/network/fetcher";

export default async function page() {
  const res = await customFetch(
    "https://api-yeshtery.dev.meetusvr.com/v1/user/info"
  ).catch(() => {});

  return (
    <>
      <Logout res={res} />
      <div className="container pt-20">
        <h2>dashboard</h2>
        <h3>name :{res?.name}</h3>
        <h3>email :{res?.email}</h3>
      </div>
    </>
  );
}
