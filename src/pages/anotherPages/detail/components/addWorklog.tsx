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
import { Controller, useForm } from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import { detailDefaultValues } from "@/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { detailValidationSchema } from "@/form/validation";
import moment from "moment";
import useDetail from "@/hooks/useDetail";

const AddWorklog = ({ isOpen, onClose, refreshData, idUser }: any) => {
  const { getDataOptions, dataOptions, postWorklogData } = useDetail();

  const [loading, setloading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: detailDefaultValues,
    resolver: yupResolver(detailValidationSchema),
  });

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      user_id: idUser,
      work_date: moment(data.work_date).format("YYYY-MM-DD"),
    };
    await postWorklogData(payload);
    await refreshData();
    onClose();
    reset();
  };

  const getData = async () => {
    setloading(true);
    await getDataOptions();
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Worklog</DialogTitle>
          <DialogDescription className="py-5 flex gap-3 flex-col">
            <Controller
              control={control}
              name="project_id"
              render={({ field }) => (
                <Combobox
                  {...field}
                  placeholder="Project"
                  options={(dataOptions as any)?.project}
                />
              )}
            />
            <div className="flex gap-3">
              <Controller
                control={control}
                name="work_date"
                render={({ field }) => <DatePicker {...field} />}
              />
              <Controller
                control={control}
                name="hours_worked"
                render={({ field }) => (
                  <Input
                    placeholder="Jam Kerja"
                    type="number"
                    max={8}
                    error={errors.hours_worked && errors.hours_worked?.message}
                    {...field}
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
};

export default AddWorklog;
