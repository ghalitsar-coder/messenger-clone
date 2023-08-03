import { AuthForm } from '@/components';
import Image from 'next/image';
import React from 'react';

function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8   bg-gray-100">
      <AuthForm />
    </div>
  );
}

export default Home;
