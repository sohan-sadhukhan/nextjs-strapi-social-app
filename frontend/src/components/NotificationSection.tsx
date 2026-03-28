import { Notifications } from "@/lib/type";
import { BellIcon } from "lucide-react";
import Notificationcard from "./Cards/Notificationcard";
import { Button } from "./shadcnui/button";

type NotificationSectionProp = {
  notifications: Notifications[];
};

const NotificationSection = ({ notifications }: NotificationSectionProp) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <>
      {/* Header */}
      <header className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BellIcon
            className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
            aria-hidden="true"
          />
          <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span
              aria-label={`${unreadCount} unread notifications`}
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] leading-none font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <Button
          variant={"ghost"}
          className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600"
          aria-label="Mark all notifications as read">
          Mark all read
        </Button>
      </header>

      {/* List */}
      <ul
        role="list"
        aria-label="Notification list"
        className="flex flex-col gap-2.5">
        {notifications.map((notification) => (
          <Notificationcard
            key={notification.id}
            notification={notification}
          />
        ))}
      </ul>

      {/* Empty state */}
      {notifications.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-16 text-zinc-400">
          <BellIcon
            className="mb-3 h-10 w-10 opacity-30"
            aria-hidden="true"
          />
          <p className="text-sm">No notifications yet</p>
        </div>
      )}
    </>
  );
};

export default NotificationSection;
