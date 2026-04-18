"use client";

import { deleteAccountSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const DeleteAccountForm = () => {
  // Controls dialog open/close state
  const [open, setOpen] = useState(false);

  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<z.infer<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
    mode: "all",
  });

  // Handle account deletion submission
  const deleteAccountHandler = async (
    password: z.infer<typeof deleteAccountSchema>,
  ) => {
    console.log(password);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      {/* Trigger button to open delete confirmation dialog */}
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          variant="destructive"
          type="button"
          className="flex cursor-pointer items-center gap-2">
          <Trash2Icon size={18} />
          Delete Account
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertTriangleIcon size={22} />
            Delete Account
          </DialogTitle>

          <DialogDescription>
            Are you absolutely sure? This action is irreversible and will
            permanently remove your account.
          </DialogDescription>
        </DialogHeader>

        {/* delete form */}
        <form
          id="delete-account-form"
          onSubmit={handleSubmit(deleteAccountHandler)}
          className="flex flex-col gap-2">
          {/*  Password Confirmation Field  */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your current Password"
                  autoComplete="current-password"
                  type="password"
                  className="my-1"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/*  Cancel Buttons  */}
          <DialogClose
            className="w-full cursor-pointer border py-1"
            disabled={isSubmitting}
            type="button">
            Cancel
          </DialogClose>

          {/* Confirm delete button */}
          <Button
            type="submit"
            variant="destructive"
            disabled={isSubmitting || !isDirty}
            onClick={() => deleteAccountHandler}
            className="my-1 flex w-full cursor-pointer items-center gap-2">
            {isSubmitting ?
              <>
                <Loader2Icon className="animate-spin" />
                Deleting...
              </>
            : <>
                <Trash2Icon size={18} />
                Delete
              </>
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountForm;
