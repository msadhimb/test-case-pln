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
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import useHome from "@/pages/store";
import useProjects from "../../project/store";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";

export function AddWorklog({ isOpen, onClose }: any) {
  const [isVisible, setIsVisible] = useState(true);
  const { postProjects } = useProjects();
  const { getProjectOriginal } = useHome();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const onSubmit = async (data: any) => {
    await postProjects(data);
    await getProjectOriginal();
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Worklog</DialogTitle>
          <DialogDescription className="py-5 flex gap-3 flex-col">
            <div className="flex gap-3">
              <Controller
                control={control}
                name="name"
                render={({ field }) => <Combobox placeholder="User" />}
              />
              <Controller
                control={control}
                name="name"
                render={({ field }) => <Combobox placeholder="Project" />}
              />
            </div>
            <div className="flex gap-3">
              <Controller
                control={control}
                name="location"
                render={({ field }) => <DatePicker />}
              />
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input placeholder="Jam Kerja" type="number" max={8} />
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
