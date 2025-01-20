import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (res?.error) {
      setError('Invalid username or password');
    } else {
      window.location.href = '/home'; // Redirect to home after successful login
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md grid grid-cols-3 gap-3 w-[75vw]">
        <div className="col-span-2 flex justify-center">
          <Image
            src="/assets/storySet/loginPict.svg"
            alt="Logo"
            width={0}
            height={0}
            className="mb-4 w-[25rem]"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center border-l pl-4">
          <h1 className="text-2xl font-bold mb-4">Worklog Management</h1>
          <div className="flex flex-col gap-1">
            <Label className="block font-semibold text-sm">Username</Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} type="text" />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="block font-semibold text-sm">Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? 'password' : 'text'}
                  iconAfter={
                    isVisible ? (
                      <IoIosEyeOff
                        size={20}
                        onClick={() => setIsVisible(false)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoIosEye
                        size={20}
                        onClick={() => setIsVisible(true)}
                        className="cursor-pointer"
                      />
                    )
                  }
                />
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleSubmit(onSubmit)}>
              Masuk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
