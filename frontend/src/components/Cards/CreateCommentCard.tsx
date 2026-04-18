"use client";

import { commentSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { Loader2Icon, SendHorizonalIcon, SmileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { Card, CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError } from "../shadcnui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcnui/popover";
import { Textarea } from "../shadcnui/textarea";

type CreateCommentCardProp = {
  currentAvatar: string;
  authorName: string;
};
const CreateCommentCard = ({
  authorName,
  currentAvatar,
}: CreateCommentCardProp) => {
  const { theme } = useTheme();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
    getValues,
    setValue,
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onSubmit",
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = getValues("comment") ?? "";

    // insert emoji at cursor or replace selected text
    const newValue =
      current.slice(0, start) + emojiData.emoji + current.slice(end);

    setValue("comment", newValue, { shouldDirty: true });
    setIsEmojiOpen(false);

    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + emojiData.emoji.length;
      // move cursor after emoji
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  const postHandler = async ({ comment }: z.infer<typeof commentSchema>) => {
    console.log(comment);

    reset();
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
            name="comment"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* Top row avatar + textarea */}
                <div className="flex items-start gap-3">
                  <Avatar className="ring-primary mt-1 h-10 w-10 ring-2">
                    <AvatarImage
                      src={`/${currentAvatar}`}
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
        </CardContent>

        {/* Action bar */}
        <CardFooter className="mt-3 justify-between">
          <div
            className="flex items-center gap-1"
            role="toolbar"
            aria-label="Post options">
            {/* Emoji */}
            <Popover
              open={isEmojiOpen}
              onOpenChange={setIsEmojiOpen}>
              <PopoverTrigger
                asChild
                type="button">
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
            disabled={!isDirty || isSubmitting}
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

export default CreateCommentCard;
