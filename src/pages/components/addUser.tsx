import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Controller, useForm } from 'react-hook-form';
import useHome from '../store';

export function AddUser({ isOpen, onClose }: any) {
  const [isVisible, setIsVisible] = useState(true);
  const { postUserData, getDataUser } = useHome();

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
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    await postUserData(data);
    await getDataUser();
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription className="py-5 flex gap-3 flex-col">
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
            <div className="flex gap-3">
              <Controller
                control={control}
                name="email"
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Password"
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
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
