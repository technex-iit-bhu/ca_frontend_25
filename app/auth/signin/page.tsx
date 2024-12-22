'use client';

import { InputFormField } from '@/app/layout/form-field';
import { login } from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { useState } from 'react';
import { BackgroundLines } from '@/components/ui/BackgroundLines';
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function SignInPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    const response = await login(data.username, data.password);
    if (response.token) {
      localStorage.setItem('token', response.token);
      window.dispatchEvent(new Event('signin'));
      router.push('/');
    } else {
      setIsLoading(false);
      form.setError('username', { message: response.message });
    }
  };

  return (
    <BackgroundLines>
      <div className="flex min-h-screen items-center justify-center  p-4 md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-8 rounded bg-[#2e2e2e38]  p-4 md:p-8"
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Login</h2>
            <div className="space-y-4">
              <InputFormField
                form={form}
                name="username"
                label="Username"
                placeholder="Enter your username"
              />
              <InputFormField
                form={form}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded bg-[#a81f25] p-2 text-white hover:bg-[#8e1a1f]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Image
                  src="/spiral-loading.gif"
                  alt="Loading..."
                  width={48}
                  height={48}
                  className="mx-auto"
                />
              ) : (
                'Login'
              )}
            </Button>
            <div className="text-center">
              <span className="text-white">New to Technex? Signup</span>
              <a href="/auth/signup" className="pl-2 text-customRed">
                HERE
              </a>
            </div>
          </form>
        </Form>
      </div>
    </BackgroundLines>
  );
}
