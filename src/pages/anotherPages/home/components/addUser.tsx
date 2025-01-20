import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import useHome from "../store";
import _ from "lodash";
import { userDefaultValues } from "@/form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addUserValidationSchema,
  updateUserValidationSchema,
} from "@/form/validation";

export function AddUser({ isOpen, onClose, data }: any) {
  const [isVisible, setIsVisible] = useState(true);
  const { postUserData, getDataUser, putUserData } = useHome();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: userDefaultValues,
    resolver: yupResolver(
      _.isEmpty(data) ? addUserValidationSchema : updateUserValidationSchema
    ),
  });

  const onSubmit = async (value: any) => {
    const payload = {
      name: value.name,
      email: value.email,
      password: value.password,
    } as any;
    if (!_.isEmpty(data)) {
      payload.password = value.password || data.password;
      payload.id = data.id;
      await putUserData(payload);
    } else {
      await postUserData(payload);
    }
    await getDataUser();
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setValue("name", data.name);
      setValue("email", data.email);
    }
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!_.isEmpty(data) ? "Edit" : "Add"} User</DialogTitle>
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
                    type={isVisible ? "password" : "text"}
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
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !dirtyFields}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
