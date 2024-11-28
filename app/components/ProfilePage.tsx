'use client';
import * as Avatar from '@radix-ui/react-avatar';
import React, { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Form, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { getProfileDetails, updateProfileDetails } from '@/app/utils/api';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  // TODO: update the optional() in case the backend supports mandatory profile completion in the future
  name: z.string().optional(),
  username: z.string(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  institute: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  pin_code: z.string().optional(),
  why_choose_you: z.string().optional(),
  is_chosen: z.boolean().optional(),
  were_ca: z.boolean().optional(),
  points: z.coerce.number().optional(),
  year: z.coerce.number().optional(),
  branch: z.string().optional(),
  referral_code: z.string().optional(),
  email: z.string().email().optional(),
});

type User = z.infer<typeof userSchema>;
type UserField = keyof User;
interface FieldConfig {
  userFriendlyLabel: string;
  editable: boolean;
  isMultiline: boolean;
  isShown: boolean;
}
interface UserStructConfigType {
  leftSideField: UserField;
  metadata: Record<UserField, FieldConfig>;
}
const UserStructConfig: UserStructConfigType = {
  leftSideField: 'why_choose_you',
  metadata: {
    name: {
      userFriendlyLabel: 'Name',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    username: {
      userFriendlyLabel: 'Username',
      editable: false,
      isMultiline: false,
      isShown: false,
    },
    phone: {
      userFriendlyLabel: 'Phone Number',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    whatsapp: {
      userFriendlyLabel: 'Whatsapp',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    institute: {
      userFriendlyLabel: 'College',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    city: {
      userFriendlyLabel: 'City',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    postal_code: {
      userFriendlyLabel: 'Postal Code',
      editable: true,
      isMultiline: false,
      isShown: false,
    },
    pin_code: {
      userFriendlyLabel: 'Pin Code',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    why_choose_you: {
      userFriendlyLabel: 'Why Choose You?',
      editable: true,
      isMultiline: true,
      isShown: true,
    },
    is_chosen: {
      userFriendlyLabel: 'Chosen as CA',
      editable: false,
      isMultiline: false,
      isShown: true,
    },
    were_ca: {
      userFriendlyLabel: 'Were CA',
      editable: false,
      isMultiline: false,
      isShown: false,
    },
    points: {
      userFriendlyLabel: 'Points',
      editable: false,
      isMultiline: false,
      isShown: true,
    },
    year: {
      userFriendlyLabel: 'Year',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    branch: {
      userFriendlyLabel: 'Branch',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
    referral_code: {
      userFriendlyLabel: 'Referral Code',
      editable: false,
      isMultiline: false,
      isShown: true,
    },
    email: {
      userFriendlyLabel: 'Email',
      editable: true,
      isMultiline: false,
      isShown: true,
    },
  },
};

let setUpdateProfileButtonVisible: React.Dispatch<React.SetStateAction<boolean>> | null = null;
let formref: UseFormReturn<User> | null = null;

const DetailTextarea = ({ className, field }: { className: string; field: UserField }) => {
  const metadata = UserStructConfig.metadata[field];
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = metadata.isMultiline
    ? () => {}
    : (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      };
  return (
    <FormField
      name={field}
      control={formref?.control}
      render={({ field: controllerField }) => {
        return (
          <FormItem>
            <Textarea
              id={field}
              className={className}
              onKeyDown={handleKeyDown}
              {...controllerField}
              value={typeof controllerField.value === 'boolean' ? (controllerField.value?'Yes':'No') : controllerField.value}
              placeholder={`Set ${metadata.userFriendlyLabel}`}
              disabled={!metadata.editable}
              style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}
              ref={(elm) => {
                controllerField.ref(elm);
                if (elm) {
                  elm.style.height = 'auto';
                  elm.style.height = `${elm.scrollHeight}px`;
                }
              }}
              onInput={()=>{setUpdateProfileButtonVisible?.(true);}}
            />
            <FormMessage className="ml-5" />
          </FormItem>
        );
      }}
    />
  );
};

const DetailElement = ({ field }: { field: UserField }) => {
  return (
    <div className="flex w-full justify-between rounded-3xl bg-[#191919] px-5 py-2">
      <span className="whitespace-nowrap text-xl font-bold">
        {UserStructConfig.metadata[field].userFriendlyLabel}:
      </span>
      <DetailTextarea
        field={field}
        className="ml-2 resize-none overflow-hidden break-words border-hidden border-[#A81F25] p-0 text-right focus:border-solid focus:bg-black"
      />
    </div>
  );
};

const ProfileCard = ({
  user,
  onProfileFormSubmit,
}: {
  user: User | null;
  onProfileFormSubmit: (data: User) => void;
}) => {
  const [updateProfileButtonVisible, _updateProfileButtonVisible] = useState(false);
  setUpdateProfileButtonVisible = _updateProfileButtonVisible;
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: user ?? {},
    mode: 'onChange',
  });
  formref = form;
  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);
  return (
    <div className="mt-12 flex w-auto max-w-5xl flex-col rounded-3xl bg-[#272727] bg-opacity-50 p-8 text-white shadow-lg">
      {user ? (
        <Form {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onProfileFormSubmit, (e) => console.error(e))}
          >
            <div className="flex flex-col gap-x-10 gap-y-10 sm:flex-row">
              <div className="w-full border-b-2 border-[#A81F25] pb-6 pr-6 sm:w-2/5 sm:border-b-0 sm:border-r-2">
                <div className="relative -top-20 inline-flex h-44 w-44 items-center justify-center rounded-full border-4 border-[#A81F25]">
                  <Avatar.Root className="h-36 w-36 overflow-hidden rounded-full">
                    {/*  no avatar image in api so using a dumb svg */}
                    <Avatar.Image
                      className="h-full w-full bg-[#6B6868] p-4"
                      src="assets/avatar-placeholder.svg"
                    />
                  </Avatar.Root>
                </div>
                <div className="-mt-16 flex flex-col gap-y-4">
                  <h1 className="overflow-hidden break-words text-3xl font-bold">
                    {user.username}
                  </h1>
                  <DetailTextarea
                    className="m-0 -translate-x-2 resize-none overflow-hidden break-words rounded-3xl border-hidden border-[#A81F25] bg-[#191919] px-5 py-2 focus:border-solid focus:bg-black"
                    field={UserStructConfig.leftSideField}
                  />
                </div>
              </div>
              <div className="flex h-auto w-72 flex-col justify-center gap-y-2 md:w-96 lg:w-[32rem]">
                {Object.keys(UserStructConfig.metadata).map((field) =>
                  UserStructConfig.metadata[field as UserField].isShown &&
                  field !== UserStructConfig.leftSideField ? (
                    <DetailElement key={field} field={field as UserField} />
                  ) : null,
                )}
              </div>
            </div>
            <Button
              className={`mx-auto my-0 mt-8 self-center rounded-3xl bg-[#A81F25] px-10 py-6 text-3xl transition-all duration-300 ease-in-out ${
                updateProfileButtonVisible
                  ? '-translate-y-0 opacity-100'
                  : 'pointer-events-none absolute -translate-y-9 opacity-0'
              }`}
              type="submit"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      ) : (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="my-2 h-12 w-96 bg-[#A81F25] bg-opacity-20 sm:w-[36rem] lg:w-[49rem]"
          />
        ))
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in.');
      }
      const data = await getProfileDetails(token);
      if (!('data' in data)) {
        throw new Error(data?.message ?? '');
      }
      console.log(data);
      const muser: User = { username: '' };
      Object.keys(userSchema.shape).forEach((key) => {
        if (key in data.data) {
          muser[key] = data.data[key];
        }
      });
      setUser(muser);
    } catch (error) {
      alert(error);
      router.push('/login');
    }
  };
  const updateUserData = async (data: User) => {
    const updatedUserJson = JSON.stringify({ ...user, ...data });
    try {
      const token = localStorage.getItem('token');
      const response = await updateProfileDetails(token ?? '', updatedUserJson);
      if (response.status !== 200) {
        const responseJson = await response.json();
        throw new Error(responseJson?.message ?? '');
      }
      alert('Profile updated successfully!');
      setUpdateProfileButtonVisible?.(false);
      setUser(null);
      fetchUserData();
    } catch (error) {
      alert('Profile Updation Error: ' + error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="mx-8 flex flex-col">
      <div className="relative mt-[3rem] scale-110 transform p-6 sm:mt-[7rem]">
        <span className="pointer-events-none absolute -bottom-2 left-5 m-0 select-none p-0 text-[6.5rem] font-bold text-[#A81F25] opacity-20 sm:-bottom-8 sm:left-4 sm:text-[10rem]">
          Profile
        </span>
        <span className="text-6xl text-white">Profile</span>
      </div>
      <ProfileCard user={user} onProfileFormSubmit={updateUserData} />
      <Button
        className="mx-auto my-8 self-center rounded-3xl bg-[#A81F25] px-10 py-6 text-3xl"
        onClick={() => router.push('/')} // TODO ensure the link to dashboard is correct
      >
        Dashboard
      </Button>
    </div>
  );
};

export default ProfilePage;
