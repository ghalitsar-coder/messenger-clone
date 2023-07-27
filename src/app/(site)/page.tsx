import { AuthForm } from '@/components';
import Image from 'next/image';
import React from 'react';

function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8   bg-gray-100">
      <figure className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="messenger-icon"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo1.png"
        />
        <figcaption className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to you account
        </figcaption>
      </figure>
      <AuthForm />
    </div>
  );
}

export default Home;
