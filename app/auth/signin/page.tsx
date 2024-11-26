'use client';

import { InputFormField } from '@/app/layout/form-field';
import { login } from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const onSubmit = async (data: { username: string; password: string }) => {
    const response = await login(data.username, data.password);
    if (response.token) {
      localStorage.setItem('token', response.token);
      router.push('/');
    } else {
      form.setError('username', { message: response.message });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-20 bg-[#191919]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 rounded p-8 outline-dotted outline-[#a81f25]"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Login</h2>
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
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
