import MyProfile from "../components/MyProfile";
import { auth } from "../lib/auth";

const Page = async () => {
  const session = await auth();
  let token = JSON.stringify(session);
  token = JSON.parse(token);

  return (
    <div className="w-full max-w-6xl flex-col p-1 sm:p-4 flex justify-start h-screen">
      <MyProfile session={session} />
    </div>
  );
};
export default Page;
