'use client';
import * as Avatar from "@radix-ui/react-avatar";
import React, { useEffect, useState} from 'react';
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {getProfileDetails} from "@/app/utils/api";
import { useRouter } from "next/navigation";

const UserStructConfig = {
    leftSideField: "why_choose_you",
    metadata : {
        name: {
            userFriendlyLabel: "Name",
            editable: false,
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
            isShown: false
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
            isShown: true
        },
        pin_code: {
            userFriendlyLabel: "Pin Code",
            editable: true,
            isMultiline: false,
            isShown: false
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
  

let setUpdateProfileButtonVisible:React.Dispatch<React.SetStateAction<boolean>> | null = null;
let formref: any = null;

const DetailTextarea = ({ className, field }: {className: string, field: string}) => {
    const metadata = UserStructConfig.metadata[field];
    const handleInput = (event) => {
        setUpdateProfileButtonVisible?.(true)
        const { value, scrollHeight } = event.target;
        event.target.style.height = 'auto';
        event.target.style.height = `${scrollHeight}px`;
    };
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = metadata.isMultiline ? () => {} : (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    return (
        <FormField name={field} control={formref.control} render={({field: controllerField})=>{
            return <FormItem>
                <Textarea
                    id={field}
                    className={className}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    placeholder={`Set ${metadata.userFriendlyLabel}`}
                    disabled={!metadata.editable}
                    style={{fontSize: "1.125rem", lineHeight: "1.75rem"}} //hardcoding it as of now as passing text-lg in className doesn't work for some reason
                    {...controllerField}
                />
                <FormMessage className="ml-5"/>
            </FormItem>
          }}
        />
        
    );
}

const DetailElement = ({field} : {field: string} ) => {
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

const ProfileCard = ({user}: {user: User | null}) => {
    const [updateProfileButtonVisible, _updateProfileButtonVisible] = useState(false);
    setUpdateProfileButtonVisible = _updateProfileButtonVisible;
    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: user
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
                    <form className="flex flex-col" onSubmit={form.handleSubmit((data) => {
                        // TODO make api call to backend to update user profile
                        prompt('Api call not made as backend has no profile updation route.', JSON.stringify({...user,...data}));
                    }, (e) => console.error(e))}>
                        <div className="flex flex-col sm:flex-row gap-x-10 gap-y-10">
                            <div className="w-full sm:w-2/5 pr-6 pb-6 border-[#A81F25] border-b-2 sm:border-b-0 sm:border-r-2">
                                <div className="relative w-44 h-44 -top-20 inline-flex justify-center items-center rounded-full border-4 border-[#A81F25]">
                                    <Avatar.Root className="w-36 h-36 rounded-full overflow-hidden">
                                        {/*  no avatar image in api so using a dumb svg */}
                                        <Avatar.Image className="w-full h-full p-4 bg-[#6B6868]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPgo8cGF0aCBkPSJNMCAwIEMxLjIzOTQ4ODk4IC0wLjAwNTExMDkzIDIuNDc4OTc3OTcgLTAuMDEwMjIxODYgMy43NTYwMjcyMiAtMC4wMTU0ODc2NyBDNy4xMTE4MjE0MiAtMC4wMjY4OTI5MiAxMC40NjczNjYxNCAtMC4wMjk0NzU0MSAxMy44MjMxNjE4NCAtMC4wMjY5MjQzNyBDMTYuNjQ3OTAwNTEgLTAuMDI1ODQyNDQgMTkuNDcyNjE3MjggLTAuMDMwNzY5MDcgMjIuMjk3MzUxMTggLTAuMDM1NTI5NzkgQzI4Ljk3NTkyMDU5IC0wLjA0NjU2NzM5IDM1LjY1NDQzMzczIC0wLjA0NzA5NTc2IDQyLjMzMzAwNzgxIC0wLjA0MTAxNTYyIEM0OS4xNjc2MjY0MiAtMC4wMzQ5ODc5MyA1Ni4wMDIwMzg1MyAtMC4wNDcyNjk0NSA2Mi44MzY2MjE5NCAtMC4wNjg1ODU2OSBDNjguNzUzMDg4OTEgLTAuMDg2MzQzNTEgNzQuNjY5NDkxMDIgLTAuMDkyMTgwNzggODAuNTg1OTgzNTcgLTAuMDg4OTQ3OTUgQzg0LjA5ODA5MjAzIC0wLjA4NzE1NjUgODcuNjEwMDUzMzUgLTAuMDg5NTUxODIgOTEuMTIyMTM3MDcgLTAuMTAzNjYyNDkgQzEyNC4xMzA5OTA2IC0wLjIyNDg1MzQ2IDE1My41Nzc2Nzc1NSA0LjY3NDUwMjEgMTgyLjE1MzU2NDQ1IDIyLjA4NzE1ODIgQzE4Mi43MjIyMDIxNSAyMi40MjgzNTY5MyAxODMuMjkwODM5ODQgMjIuNzY5NTU1NjYgMTgzLjg3NjcwODk4IDIzLjEyMTA5Mzc1IEMxOTguMDAwMTg4ODEgMzIuMTQ3MTgzOTEgMjA5LjgyNjY4NzI5IDQ0Ljk1MDAxNTQ2IDIyMS41OTQ5NzA3IDU2LjcyMDQ1ODk4IEMyMjQuMjkxMjYzMzQgNTkuNDEyMzM2MyAyMjcuMDAzMjM4NCA2Mi4wODc3MzcyNSAyMjkuNzE2MDY0NDUgNjQuNzYyOTM5NDUgQzIzMS40NTY2MjQ2MyA2Ni40OTc2MzY5NCAyMzMuMTk2MjQxOSA2OC4yMzMyODExNSAyMzQuOTM0ODE0NDUgNjkuOTY5OTcwNyBDMjM2LjEzNDkxMTUgNzEuMTQ4NTExMiAyMzYuMTM0OTExNSA3MS4xNDg1MTEyIDIzNy4zNTkyNTI5MyA3Mi4zNTA4NjA2IEMyNDcuMzc3OTM2MjcgODIuNDUxMTc1ODcgMjUzLjQyOTY1MTk5IDkzLjk4OTI5ODY3IDI1NC4wMjg1NjQ0NSAxMDguMzM3MTU4MiBDMjUzLjgyMzcxMDA2IDEyMS44MzQ3ODY1MSAyNDguODM2ODc5NzIgMTMyLjgzNDMwODE1IDIzOS43MTk5NzA3IDE0Mi41NTIwMDE5NSBDMjI3LjYzOTk5ODI2IDE1NC4xODY5NDUzIDIxMi4xMzI0NTU1MiAxNjIuODAzODQ5MTQgMTk3Ljc3ODU2NDQ1IDE3MS4yNzQ2NTgyIEMxOTcuMTI4ODc2OTUgMTcxLjY1OTYwNDQ5IDE5Ni40NzkxODk0NSAxNzIuMDQ0NTUwNzggMTk1LjgwOTgxNDQ1IDE3Mi40NDExNjIxMSBDMTU3LjQ1NzI2OTY3IDE5NC44NDUwMTk4MiAxMDkuNDg3MTU0MzUgMjA4LjI2MzkzODI0IDY1LjA4MzI1MTk1IDIwOC40Nzc3ODMyIEM2NC4xMDA4NTU0MSAyMDguNDg0ODQyODMgNjMuMTE4NDU4ODYgMjA4LjQ5MTkwMjQ3IDYyLjEwNjI5MjcyIDIwOC40OTkxNzYwMyBDMjEuMTc2NDMxMzQgMjA4LjcyNjU4NDM0IDIxLjE3NjQzMTM0IDIwOC43MjY1ODQzNCAyLjc3ODU2NDQ1IDIwNS4yNzQ2NTgyIEMxLjEzNTk3NjU2IDIwNC45NzY2NDMwNyAxLjEzNTk3NjU2IDIwNC45NzY2NDMwNyAtMC41Mzk3OTQ5MiAyMDQuNjcyNjA3NDIgQy0yOS43MjA5NjUwMiAxOTkuMjUyODk5MjkgLTU4LjA1NDM3NjM5IDE5MC4wNzg3OTMzOCAtODQuMzU1MjI0NjEgMTc2LjI0ODI5MTAyIEMtODYuMTYyNDIyNiAxNzUuMzA1NDQ2MjIgLTg3Ljk4MjA1MzE4IDE3NC4zOTI3NTQ2NyAtODkuODA3MzczMDUgMTczLjQ4NTU5NTcgQy0xMTEuMTgzOTM0NjUgMTYyLjY5NDA1MzUxIC0xMzkuOTMxNjE1NjMgMTQ3LjAwMzAwOTEzIC0xNDguMjIxNDM1NTUgMTIzLjI3NDY1ODIgQy0xNTEuNzMyMTU5MjEgMTExLjAxNDY5NjUyIC0xNTAuOTcxODQzOTYgOTguMDczNjgzMyAtMTQ1LjA5NjQzNTU1IDg2LjU4NzE1ODIgQy0xMzcuOTIxMzI1NTMgNzUuMjI1MjA1MzMgLTEyNy4wMzU3NjA5NyA2NS44Mzk5MDAyIC0xMTcuNjEzMjgxMjUgNTYuMzcxMzM3ODkgQy0xMTUuOTg1MDU3MDkgNTQuNzMxNjE0MjkgLTExNC4zNjEzMDE5NiA1My4wODc0NDAxNCAtMTEyLjc0MjE4NzUgNTEuNDM4NzIwNyBDLTEwMC4xNTI0ODM3OSAzOC42MTk5MjcxMyAtODcuMjA1NjQ3OTggMjYuNDA5NjcyMzQgLTcxLjIyMTQzNTU1IDE3Ljg5OTY1ODIgQy03MC40NzU2MzIzMiAxNy40OTU5Mzk5NCAtNjkuNzI5ODI5MSAxNy4wOTIyMjE2OCAtNjguOTYxNDI1NzggMTYuNjc2MjY5NTMgQy01OC42MTM2MDIyOSAxMS4yMTE1NDA5IC00Ny44NjQyODQ2MSA3LjU4NTU1MTMzIC0zNi41OTY0MzU1NSA0LjUyNDY1ODIgQy0zNS44Njk0ODQ4NiA0LjMyNTczOTc1IC0zNS4xNDI1MzQxOCA0LjEyNjgyMTI5IC0zNC4zOTM1NTQ2OSAzLjkyMTg3NSBDLTIzLjA2Mzc0OTMzIDEuMDA1OTIzMTEgLTExLjY2ODgwOTMzIC0wLjAyNTQ2MDggMCAwIFogIiBmaWxsPSIjMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDQuMjIxNDM1NTQ2ODc1LDMwMy43MjUzNDE3OTY4NzUpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNzAxNzYzNjEgMC4wMDA4NzYxNiAxLjQwMzUyNzIyIDAuMDAxNzUyMzIgMi4xMjY1NTY0IDAuMDAyNjU1MDMgQzMzLjIyMzYyNjYxIDAuMTMwMjQ0OTggNjAuNTk1NzI0NjcgMTAuNjE5NDAwNTUgODQuNSAzMC4zNzUgQzg1LjI3MDg1OTM3IDMxLjAwNDA2MjUgODYuMDQxNzE4NzUgMzEuNjMzMTI1IDg2LjgzNTkzNzUgMzIuMjgxMjUgQzkxLjU0OTE2NjMgMzYuMjU0MDg2NTMgOTUuNjIwOTYyMDEgNDAuNTkwMDI5NTcgOTkuNSA0NS4zNzUgQzEwMC4xOTk5NjA5NCA0Ni4yMzczODI4MSAxMDAuODk5OTIxODggNDcuMDk5NzY1NjMgMTAxLjYyMTA5Mzc1IDQ3Ljk4ODI4MTI1IEMxMjMuNTAwMTk0MDkgNzYuMDEwMjEzOTIgMTMyLjgzNDAwMDQxIDExMC40Mjc2MDIyNiAxMjguNTUyNDkwMjMgMTQ1LjcwNDgzMzk4IEMxMjUuMTE5OTI5MDkgMTcwLjQxOTgyODMxIDExNS4wMDcxNjY4NCAxOTMuNjIzMzEzMDYgOTguNSAyMTIuMzc1IEM5Ny44MDI2MTcxOSAyMTMuMjA1MTU2MjUgOTcuMTA1MjM0MzggMjE0LjAzNTMxMjUgOTYuMzg2NzE4NzUgMjE0Ljg5MDYyNSBDNzUuNjQ1NTAxMjYgMjM5LjAwNjU1NjEyIDQ1LjAxNDI2MTYxIDI1My45OTk0NzA0OCAxMy40NTcwMzEyNSAyNTcuMTMyODEyNSBDLTI0LjEzMTkxNDEgMjU5LjQzMzQxOTIyIC01Ny43NzI0MjI3IDI0OC44NzA1MDcxNiAtODYuMzk0NTMxMjUgMjI0LjE4MzU5Mzc1IEMtMTEwLjkzNDA2Mjc1IDIwMi4zNTA1OTkzNCAtMTI2LjExODIzNDc0IDE3MC45MjY5MTM2MyAtMTI4LjM3MTA5Mzc1IDEzOC4xNDA2MjUgQy0xMjguNDEzNjMyODEgMTM3LjIyNzk2ODc1IC0xMjguNDU2MTcxODcgMTM2LjMxNTMxMjUgLTEyOC41IDEzNS4zNzUgQy0xMjguNTc5Mjc3MzQgMTMzLjg4MjI2NTYzIC0xMjguNTc5Mjc3MzQgMTMzLjg4MjI2NTYzIC0xMjguNjYwMTU2MjUgMTMyLjM1OTM3NSBDLTEyOS4xMTM0Mzg4MyAxMTUuNzI1ODc0OTkgLTEyNi40NTgxNjQyNyA5OC45MTAwNjY0NCAtMTIwLjUgODMuMzc1IEMtMTIwLjI1MjY2MTEzIDgyLjcyMzcwMTE3IC0xMjAuMDA1MzIyMjcgODIuMDcyNDAyMzQgLTExOS43NTA0ODgyOCA4MS40MDEzNjcxOSBDLTExMy40OTM0NjA0MiA2NS4yODk0MjIyNCAtMTA0LjY5NTcyNDQgNTEuNjA4MTkyMDYgLTkyLjUgMzkuMzc1IEMtOTEuNjU5NTMxMjUgMzguNTI4MDg1OTQgLTkwLjgxOTA2MjUgMzcuNjgxMTcxODcgLTg5Ljk1MzEyNSAzNi44MDg1OTM3NSBDLTY1LjU0Nzg5NTk1IDEyLjU5NzY3Mzg1IC0zNC4zODQ4OTY0MiAtMC4xMDUzNDg2OSAwIDAgWiAiIGZpbGw9IiMwMDAwMDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1NS41LC0wLjM3NSkiLz4KPC9zdmc+Cg=="/>
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
                                        UserStructConfig.metadata[field].isShown && field!==UserStructConfig.leftSideField ? (
                                            <DetailElement key={field} field={field} />
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
    useEffect(() => {
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
              console.error('Error fetching user data:', error);
              router.push('/login'); 
          }
        };
    
        fetchUserData();
      }, []);
    return (
        <div className="mx-8 flex flex-col">
            <div className="relative p-6 mt-[3rem] sm:mt-[7rem] transform scale-110">
                <span className="absolute left-5 -bottom-2 m-0 p-0 text-[6.5rem] sm:text-[10rem] sm:-bottom-8 sm:left-4 font-bold text-[#A81F25] opacity-20 pointer-events-none select-none">Profile</span>
                <span className="text-white text-6xl">Profile</span>
            </div>
            <ProfileCard user={user}/>
            <Button className="my-8 bg-[#A81F25] text-3xl px-10 py-6 rounded-3xl mx-auto self-center">Dashboard</Button>
        </div>
    );
};

export default ProfilePage;