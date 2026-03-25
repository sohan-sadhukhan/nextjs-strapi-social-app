"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcnui/popover";
import { Textarea } from "@/components/shadcnui/textarea";
import { postDescriptionSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import {
  ImageIcon,
  Loader2Icon,
  SendHorizonalIcon,
  SmileIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import z from "zod";
import { Card, CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError } from "../shadcnui/field";

type CreatePostCardProps = {
  currentAvatar: string;
  authorName: string;
};

const CreatePostCard = ({ currentAvatar, authorName }: CreatePostCardProps) => {
  const { theme } = useTheme();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { openFilePicker, filesContent, plainFiles, errors, clear } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
    });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
    getValues,
    setValue,
  } = useForm<z.infer<typeof postDescriptionSchema>>({
    resolver: zodResolver(postDescriptionSchema),
    defaultValues: {
      description: "",
    },
    mode: "all",
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = getValues("description") ?? "";

    // insert emoji at cursor or replace selected text
    const newValue =
      current.slice(0, start) + emojiData.emoji + current.slice(end);

    setValue("description", newValue, { shouldDirty: true });
    setIsEmojiOpen(false);

    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + emojiData.emoji.length;
      // move cursor after emoji
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  const postHandler = async ({
    description,
  }: z.infer<typeof postDescriptionSchema>) => {
    console.log({ description, image: filesContent[0]?.content });

    reset();
    clear();
  };

  const nameArray = authorName.split(" ");
  const charactersArray = nameArray.map((n) => {
    return n.charAt(0);
  });

  return (
    <Card
      aria-label="Create a new post"
      className="w-full rounded-none sm:min-w-xs sm:rounded-2xl sm:shadow-sm">
      <form
        onSubmit={handleSubmit(postHandler)}
        noValidate
        aria-label="Create post">
        <CardContent>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* Top row — avatar + textarea */}
                <div className="flex items-start gap-3">
                  <Avatar className="ring-primary mt-1 h-10 w-10 ring-2">
                    <AvatarImage
                      src={currentAvatar}
                      alt={authorName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-linear-to-br from-blue-400 to-indigo-600 text-sm font-bold text-white">
                      {charactersArray.join("")}
                    </AvatarFallback>
                  </Avatar>

                  <Textarea
                    {...field}
                    ref={(el) => {
                      field.ref(el); // react-hook-form ref
                      textareaRef.current = el; // custom ref
                    }}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="What's on your mind?"
                    className="bg-foreground/10 h-10 resize-none rounded-xl border-0 px-4 py-3 text-sm"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Image preview */}
          {filesContent[0]?.content && (
            <div className="relative mt-3 ml-13 overflow-hidden rounded-xl">
              <Image
                height={600}
                width={600}
                src={filesContent[0].content}
                alt={plainFiles[0]?.name ?? "Selected image"}
                className="w-full object-cover"
              />
              <Button
                type="button"
                size="icon"
                onClick={clear} // remove selected image
                aria-label="Remove selected image"
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white hover:bg-black/80">
                ✕
              </Button>
            </div>
          )}

          {/* File size error */}
          {errors[0] && (
            <p
              role="alert"
              className="mt-2 text-center text-xs text-red-500">
              Image is too large. Maximum size is 5 MB.
            </p>
          )}
        </CardContent>

        {/* Action bar */}
        <CardFooter className="mt-3 justify-between">
          <div
            className="flex items-center gap-1"
            role="toolbar"
            aria-label="Post options">
            {/* Photo */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={openFilePicker}
              aria-label="Add a photo"
              className="gap-2 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
              <ImageIcon
                className="h-4 w-4 text-green-500"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">Photo</span>
            </Button>

            {/* Emoji */}
            <Popover
              open={isEmojiOpen}
              onOpenChange={setIsEmojiOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Add an emoji"
                  aria-expanded={isEmojiOpen}
                  aria-haspopup="dialog"
                  className="gap-2 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                  <SmileIcon
                    className="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium">Emoji</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                className="w-auto border-0 p-0 shadow-xl"
                aria-label="Emoji picker">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                  lazyLoadEmojis
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Post button */}
          <Button
            type="submit"
            size="sm"
            disabled={(!isDirty && !filesContent[0]?.content) || isSubmitting}
            aria-label="Submit post"
            className="cursor-pointer gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ?
              <>
                <Loader2Icon
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Posting...
              </>
            : <>
                <SendHorizonalIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Post
              </>
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostCard;
