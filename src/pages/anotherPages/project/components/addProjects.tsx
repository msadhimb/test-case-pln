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
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useProjects from '../store';
import _ from 'lodash';
import { projectDefaultValues } from '@/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectValidationSchema } from '@/form/validation';
import useHome from '../../home/store';

export function AddProjects({ isOpen, onClose, data }: any) {
  const { postProjects, putProjects } = useProjects();
  const { getProjectOriginal } = useHome();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: projectDefaultValues,
    resolver: yupResolver(projectValidationSchema),
  });

  const onSubmit = async (value: any) => {
    const payload = {
      name: value.name,
      location: value.location,
    } as any;

    if (!_.isEmpty(data)) {
      payload.id = data.id;
      await putProjects(payload);
    } else {
      await postProjects(payload);
    }

    await getProjectOriginal();
    onClose();
    reset();
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setValue('name', data.name);
      setValue('location', data.location);
    }
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {!_.isEmpty(data) ? 'Edit' : 'Add'} Projects
          </DialogTitle>
          <DialogDescription className="py-5 flex gap-3 flex-col">
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <Input {...field} placeholder="Location" />
              )}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || _.isEmpty(dirtyFields)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
