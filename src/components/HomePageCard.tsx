import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

export default function HomePageCard({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="flex justify-center items-center vertical-center bg-gray-100">
      <div className="w-1/3 h-48 shadow-md shadow-blue-300 bg-gray-200 rounded-lg p-5">
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <div className="text-4xl font-bold text-gray-700">
            Welcome to the Blog APP!
          </div>
          <div className="text-sm font-semibold">
            {isLoggedIn
              ? "Please explore all the blogs"
              : "Please Login to Explore all the Features"}
          </div>
          <div className="flex flex-row gap-5">
            {isLoggedIn ? (
              ""
            ) : (
              <div>
                <LoginButton />
                <RegisterButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
