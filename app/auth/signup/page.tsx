'use client';

import { InputFormField } from '@/app/components/form-field';
import { signup } from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character.',
  });

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    phoneNumber: z.string().length(10, { message: 'Phone number must be 10 digits.' }),
    whatsappNumber: z.string().length(10, { message: 'Whatsapp number must be 10 digits.' }),
    institute: z.string().min(1, { message: 'Institute is required.' }),
    referralCode: z.string().min(1, { message: 'Referral code is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      whatsappNumber: '',
      institute: '',
      referralCode: '',
    },
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const onSubmit = async (signupData: FormData) => {
    const response = await signup(signupData);
    if (response.message === 'User created successfully') {
      router.push('/auth/signin');
    } else {
      form.setError('username', { message: response.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-[#191919] p-8 rounded outline-dotted outline-[#a81f25] w-full max-w-md"
        >
          <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>
          <div className="space-y-4">
            <InputFormField form={form} name="name" label="Name" placeholder="Enter your name" />
            <InputFormField
              form={form}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <InputFormField
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <div className="flex flex-col md:flex-row md:space-x-4">
              <InputFormField
                form={form}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <InputFormField
                form={form}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <InputFormField
                form={form}
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <InputFormField
                form={form}
                name="whatsappNumber"
                label="Whatsapp Number"
                placeholder="Enter your whatsapp number"
              />
            </div>
            <InputFormField
              form={form}
              name="institute"
              label="Institute"
              placeholder="Enter your institute"
            />
            <InputFormField
              form={form}
              name="referralCode"
              label="Referral Code"
              placeholder="Enter your referral code"
            />
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className="h-4 w-4"
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <Label className="text-white">I agree to the terms and conditions</Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#a81f25] hover:bg-[#8e1a1f] text-white p-2 rounded"
            disabled={!isCheckboxChecked}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
