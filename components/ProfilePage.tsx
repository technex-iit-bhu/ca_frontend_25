'use client';
import * as Avatar from "@radix-ui/react-avatar";
import React, { useEffect, useState} from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {getProfileDetails, updateProfileDetails} from "@/app/utils/api";
import { useRouter } from "next/navigation";

const userSchema = z.object({ // TODO: update the optional() in case the backend supports mandatory profile completion in the future
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
    email: z.string().email().optional()
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
const UserStructConfig : UserStructConfigType = {
    leftSideField: "why_choose_you",
    metadata : {
        name: {
            userFriendlyLabel: "Name",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        username: {
            userFriendlyLabel: "Username",
            editable: false,
            isMultiline: false,
            isShown: false
        },
        phone: {
            userFriendlyLabel: "Phone Number",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        whatsapp: {
            userFriendlyLabel: "Whatsapp",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        institute: {
            userFriendlyLabel: "College",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        city: {
            userFriendlyLabel: "City",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        postal_code: {
            userFriendlyLabel: "Postal Code",
            editable: true,
            isMultiline: false,
            isShown: false
        },
        pin_code: {
            userFriendlyLabel: "Pin Code",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        why_choose_you: {
            userFriendlyLabel: "Why Choose You?",
            editable: true,
            isMultiline: true,
            isShown: true
        },
        is_chosen: {
            userFriendlyLabel: "Chosen as CA",
            editable: false,
            isMultiline: false,
            isShown: true
        },
        were_ca: {
            userFriendlyLabel: "Were CA",
            editable: false,
            isMultiline: false,
            isShown: false
        },
        points: {
            userFriendlyLabel: "Points",
            editable: false,
            isMultiline: false,
            isShown: true
        },
        year: {
            userFriendlyLabel: "Year",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        branch: {
            userFriendlyLabel: "Branch",
            editable: true,
            isMultiline: false,
            isShown: true
        },
        referral_code: {
            userFriendlyLabel: "Referral Code",
            editable: false,
            isMultiline: false,
            isShown: true
        },
        email: {
            userFriendlyLabel: "Email",
            editable: true,
            isMultiline: false,
            isShown: true
        }
    }
};

let setUpdateProfileButtonVisible:React.Dispatch<React.SetStateAction<boolean>> | null = null;
let formref: UseFormReturn<User> | null = null;

const DetailTextarea = ({ className, field }: {className: string, field: UserField}) => {
    const metadata = UserStructConfig.metadata[field];
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = metadata.isMultiline ? () => {} : (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    return (
        <FormField name={field} control={formref?.control} render={({field: controllerField})=>{
            return <FormItem>
                <Textarea
                    id={field}
                    className={className}
                    onKeyDown={handleKeyDown}
                    // onInput={handleInput}
                    placeholder={`Set ${metadata.userFriendlyLabel}`}
                    disabled={!metadata.editable}
                    style={{fontSize: "1.125rem", lineHeight: "1.75rem"}} //hardcoding it as of now as passing text-lg in className doesn't work for some reason
                    {...controllerField}
                    ref = {(elm)=>{
                        controllerField.ref(elm);
                        if (elm) {
                            elm.style.height = 'auto';
                            elm.style.height = `${elm.scrollHeight}px`;
                            setUpdateProfileButtonVisible?.(true)
                        }
                    }}
                />
                <FormMessage className="ml-5"/>
            </FormItem>
          }}
        />
        
    );
}

const DetailElement = ({field} : {field: UserField} ) => {
    return (
        <div className="flex w-full justify-between py-2 px-5 bg-[#191919] rounded-3xl" >
            <span className="font-bold text-xl whitespace-nowrap">{UserStructConfig.metadata[field].userFriendlyLabel}:</span> 
            <DetailTextarea 
                field={field}
                className="p-0 ml-2 border-[#A81F25] border-hidden resize-none focus:border-solid focus:bg-black text-right overflow-hidden break-words"
            />
        </div>
    );
}

const ProfileCard = ({user, onProfileFormSubmit}: {user: User | null, onProfileFormSubmit: (data: User) => void}) => {
    const [updateProfileButtonVisible, _updateProfileButtonVisible] = useState(false);
    setUpdateProfileButtonVisible = _updateProfileButtonVisible;
    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: user ?? {},
        mode: 'onChange'
    });
    formref = form;
    useEffect(() => {
        if (user) {
            form.reset(user);
        }
    }, [user, form]);
    return (
        <div className="text-white bg-[#272727] bg-opacity-50 p-8 mt-12 rounded-3xl shadow-lg w-auto max-w-5xl flex flex-col">
            {user?(
                <Form {...form}>
                    <form className="flex flex-col" onSubmit={form.handleSubmit(onProfileFormSubmit, (e) => console.error(e))}>
                        <div className="flex flex-col sm:flex-row gap-x-10 gap-y-10">
                            <div className="w-full sm:w-2/5 pr-6 pb-6 border-[#A81F25] border-b-2 sm:border-b-0 sm:border-r-2">
                                <div className="relative w-44 h-44 -top-20 inline-flex justify-center items-center rounded-full border-4 border-[#A81F25]">
                                    <Avatar.Root className="w-36 h-36 rounded-full overflow-hidden">
                                        {/*  no avatar image in api so using a dumb svg */}
                                        <Avatar.Image className="w-full h-full p-4 bg-[#6B6868]" src="assets/avatar-placeholder.svg"/>
                                    </Avatar.Root>
                                </div>
                                <div className="-mt-16 flex flex-col gap-y-4">
                                    <h1 className="text-3xl font-bold overflow-hidden break-words">{user.username}</h1>
                                    <DetailTextarea
                                        className="py-2 px-5 bg-[#191919] rounded-3xl -translate-x-2 m-0 border-[#A81F25] border-hidden resize-none focus:border-solid focus:bg-black overflow-hidden break-words"
                                        field={UserStructConfig.leftSideField}
                                    />
                                </div>
                            </div>
                            <div className="h-auto justify-center flex flex-col gap-y-2 w-72 md:w-96 lg:w-[32rem]">
                                {
                                    Object.keys(UserStructConfig.metadata).map((field) => (
                                        UserStructConfig.metadata[field as UserField].isShown && field!==UserStructConfig.leftSideField ? (
                                            <DetailElement key={field} field={field as UserField} />
                                        ) : null
                                    ))
                                    
                                }
                            </div>
                        </div>
                        <Button className={`transition-all duration-300 ease-in-out bg-[#A81F25] text-3xl px-10 py-6 rounded-3xl my-0 mt-8 mx-auto self-center ${
                                updateProfileButtonVisible ? "opacity-100 -translate-y-0" : "-translate-y-9 opacity-0 absolute pointer-events-none"
                            }`}
                            type="submit"
                            >
                            Update Profile
                        </Button>
                    </form>
                </Form>
                ):(
                    Array.from({ length: 3 }).map((_, i) => (<Skeleton key={i} className="bg-[#A81F25] my-2 bg-opacity-20 w-96 sm:w-[36rem] lg:w-[49rem] h-12" />))
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
            if(!token) {
                throw new Error('User not logged in.');
            }
            const data = await getProfileDetails(token);
            if (! ('data' in data)) {
                throw new Error(data?.message ?? '');
            }
            console.log(data);
            const muser : User = {};
            Object.keys(userSchema.shape).forEach((key) => {
                if (key in data.data){
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
        const updatedUserJson = JSON.stringify({...user,...data});
        try {
            const token = localStorage.getItem('token');
            const response = await updateProfileDetails(token??'', updatedUserJson);
            if (response.status !== 200) {
                const responseJson = await response.json();
                throw new Error(responseJson?.message ?? '');
            }
            alert('Profile updated successfully!');
            setUpdateProfileButtonVisible?.(false);
            setUser(null);
            fetchUserData();
        } catch (error) {
            alert("Profile Updation Error: " + error);
        }
    }
    useEffect(() => {
        fetchUserData();
      }, []);
    return (
        <div className="mx-8 flex flex-col">
            <div className="relative p-6 mt-[3rem] sm:mt-[7rem] transform scale-110">
                <span className="absolute left-5 -bottom-2 m-0 p-0 text-[6.5rem] sm:text-[10rem] sm:-bottom-8 sm:left-4 font-bold text-[#A81F25] opacity-20 pointer-events-none select-none">Profile</span>
                <span className="text-white text-6xl">Profile</span>
            </div>
            <ProfileCard user={user} onProfileFormSubmit={updateUserData}/>
            <Button
                className="my-8 bg-[#A81F25] text-3xl px-10 py-6 rounded-3xl mx-auto self-center"
                onClick={() => router.push('/')} // TODO ensure the link to dashboard is correct
            >
                Dashboard
            </Button>
        </div>
    );
};

export default ProfilePage;