import LoginButton from "@/components/LoginButton";
import RegisterButton from "@/components/RegisterButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <div className="flex justify-center items-center vertical-center bg-gray-100">
          <div className="w-1/3 h-48 shadow-md shadow-blue-300 bg-gray-200 rounded-lg p-5">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="text-4xl font-bold text-gray-700">
                Welcome to the Blog APP!
              </div>
              <div className="text-sm font-semibold">
                You can start exploring Awesome Blogs Now
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center vertical-center bg-gray-100">
          <div className="w-1/3 h-48 shadow-md shadow-blue-300 bg-gray-200 rounded-lg p-5">
            <div className="flex flex-col gap-2 h-full justify-center items-center">
              <div className="text-4xl font-bold text-gray-700">
                Welcome to the Blog APP!
              </div>
              <div className="text-sm font-semibold">
                Please Login to Explore all the Features!
              </div>
              <div className="flex flex-row gap-5">
                <LoginButton />
                <RegisterButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
