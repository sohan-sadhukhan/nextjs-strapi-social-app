"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import { Card } from "../shadcnui/card";

type SuggestedUserType = {
  id: number;
  name: string;
  handle: string;
  mutual: string;
  initials: string;
  bg: string;
  text: string;
};

type Props = {
  usersData: SuggestedUserType[];
};

const SuggestedUsers = ({ usersData }: Props) => {
  const [users, setUsers] = useState(usersData);
  const [shownCount, setShownCount] = useState(4);

  const dismiss = (id: any) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  const visibleUsers = users.slice(0, shownCount);
  return (
    <aside className="flex w-full flex-col gap-4 font-sans">
      <div className="flex flex-col gap-4">
        {visibleUsers.map((user) => (
          <Card
            key={user.id}
            className="border-border/50 relative flex items-center gap-3 rounded-xl border px-3.5 py-3 shadow-none">
            <Button
              variant={"ghost"}
              onClick={() => dismiss(user.id)}
              className="absolute top-2 right-2.5 rounded p-0.5 text-sm"
              aria-label="Dismiss notification">
              <X
                size={12}
                aria-hidden="true"
              />
            </Button>

            {/* Avatar */}
            <div
              className={`border-border/40 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${user.bg} ${user.text}`}>
              {user.initials}
            </div>

            {/* Info */}
            <div>
              <p className="text-foreground text-sm font-semibold">
                {user.name}
              </p>
              <p className="text-muted-foreground text-xs">{user.handle}</p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {user.mutual}
              </p>
            </div>

            {/* Follow button */}
            <Button
              size="sm"
              className="cursor-pointer rounded-full bg-blue-600 px-3.5 text-xs text-white shadow-none hover:bg-blue-700">
              Follow
            </Button>
          </Card>
        ))}
      </div>

      {shownCount < users.length && (
        <Button
          variant={"link"}
          onClick={() => setShownCount((c) => Math.min(c + 2, users.length))}
          className="text-left text-sm font-medium text-blue-600 transition-opacity hover:opacity-75">
          Show more suggestions
        </Button>
      )}
    </aside>
  );
};

export default SuggestedUsers;
