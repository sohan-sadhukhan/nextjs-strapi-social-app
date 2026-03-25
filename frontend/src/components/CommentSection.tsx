import { MessageCircleIcon } from "lucide-react";
import CommentCard from "./Cards/CommentCard";
import CreateCommentCard from "./Cards/CreateCommentCard";
import PostCard from "./Cards/PostCard";
import { Button } from "./shadcnui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcnui/dialog";
import { ScrollArea } from "./shadcnui/scroll-area";

type CommentSectionProp = {
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  timeAgo: string;
  description: string;
  postImage: string;
  reactionCount: number;
  isFollowing: boolean;
  isOwnPost: boolean;
  comments: {
    id: number;
    name: string;
    userName: string;
    avatarUrl: string;
    timeAgo: string;
    comment: string[];
  };
};

const CommentSection = ({
  authorName,
  authorUsername,
  authorAvatar,
  description,
  postImage,
  isFollowing,
  isOwnPost,
  reactionCount,
  timeAgo,
  comments,
}: CommentSectionProp) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Comment on post"
          className="text-muted-foreground hover:text-foreground cursor-pointer gap-2 rounded-xl font-medium">
          <MessageCircleIcon
            className="size-5 sm:size-4"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">Comment</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-1.5 pt-4 sm:max-w-2xl sm:p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl"></DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[90dvh]">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-4 py-1 sm:px-1">
              <PostCard
                authorName={authorName}
                authorUsername={authorUsername}
                authorAvatar={authorAvatar}
                timeAgo={timeAgo}
                description={description}
                postImage={postImage}
                reactionCount={reactionCount}
                isFollowing={isFollowing}
                isOwnPost={isOwnPost}
                comments={comments}
              />

              <CreateCommentCard
                currentAvatar={authorAvatar}
                authorName={authorName}
              />

              {comments.comment.map((comment, ind) => (
                <CommentCard
                  key={ind}
                  avatarUrl={authorAvatar}
                  name={authorName}
                  username={authorUsername}
                  timeAgo={timeAgo}
                  comment={comment}
                  isOwn={isOwnPost}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CommentSection;
