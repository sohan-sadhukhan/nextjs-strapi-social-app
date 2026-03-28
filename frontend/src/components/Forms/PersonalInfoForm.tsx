"use client";

import { personalInfoSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon, Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type PersonalInfoFormType = {
  username: string;
  email: string;
};

const PersonalInfoForm = ({ email, username }: PersonalInfoFormType) => {
  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { username, email },
    mode: "all",
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof personalInfoSchema>) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Update personal information"
      className="grid gap-4 sm:grid-cols-2">
      {/* Username */}
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your username"
              autoComplete="username"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        className="flex w-fit cursor-pointer bg-blue-600 text-white hover:bg-blue-700 sm:col-span-2"
        disabled={isSubmitting || !isDirty}
        aria-disabled={isSubmitting || !isDirty}>
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" />
            Updating...
          </>
        : <>
            <Edit2Icon />
            Update personal information
          </>
        }
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
