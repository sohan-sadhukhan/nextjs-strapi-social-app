"use client";

import { changePasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRoundIcon, Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const ChangePasswordForm = () => {
  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "all",
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Change password"
      className="grid gap-4">
      {/* Current Password — full width */}
      <Controller
        name="currentPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Current password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* New + Confirm Password 2 columns on sm+ */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="flex w-fit cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        disabled={isSubmitting || !isDirty}
        aria-disabled={isSubmitting || !isDirty}>
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" />
            Updating...
          </>
        : <>
            <KeyRoundIcon />
            Update Password
          </>
        }
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
