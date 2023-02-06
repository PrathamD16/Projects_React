import React from "react";
import { getProviders, signIn as SignInProvider } from "next-auth/react";
import Header from "../../components/Header";
//Displayed in
export default function signin({ providers }) {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center py-3 min-h-screen px-14 text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />

        <p className="italic font-xs">
          This app is only for educational purpose. THIS IS NOT A REAL APP.
        </p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => SignInProvider(provider.id, {callbackUrl:'/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
