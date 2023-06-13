import { Hackathon } from "@/pages/api/hackathons";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

const kanbanItemLoadingSkeletonVariants = cva(
  [
    "flex",
    "flex-col",
    "gap-2.5",
    "rounded-lg",
    "p-3",
    "animate-pulse",
    "h-24",
    "shadow-sm",
  ],
  {
    variants: {
      variant: {
        "to-do": ["bg-gradient-purple"],
        "in-progress": ["bg-gradient-green"],
        done: ["bg-gradient-orange"],
      },
    },
  }
);

export interface KanbanItemLoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kanbanItemLoadingSkeletonVariants> {}

export function KanbanItemLoadingSkeleton({
  variant,
  className,
  ...props
}: KanbanItemLoadingSkeletonProps) {
  return (
    <div
      className={twMerge(
        kanbanItemLoadingSkeletonVariants({ variant }),
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div
          className={twMerge(
            kanbanItemLoadingSkeletonVariants({ variant }),
            "h-4 w-4/12 animate-pulse rounded-lg"
          )}
        />

        <div
          className={twMerge(
            kanbanItemLoadingSkeletonVariants({ variant }),
            "h-4 w-3/12 animate-pulse rounded-lg"
          )}
        />
      </div>

      <div
        className={twMerge(
          kanbanItemLoadingSkeletonVariants({ variant }),
          "h-5 w-8/12 animate-pulse rounded-lg"
        )}
      />
    </div>
  );
}

const kanbanItemVariants = cva(
  ["flex", "flex-col", "gap-2", "rounded-lg", "p-3"],
  {
    variants: {
      variant: {
        "to-do": ["bg-gradient-purple"],
        "in-progress": ["bg-gradient-green"],
        done: ["bg-gradient-orange"],
      },
    },
  }
);

export interface KanbanItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kanbanItemVariants> {
  kanbanItem: Hackathon;
}

export default function KanbanItem({
  variant,
  kanbanItem,
  className,
  ...props
}: KanbanItemProps) {
  return (
    <div
      className={twMerge(kanbanItemVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p>{kanbanItem.totalPeople} people</p>

        <p>{format(new Date(kanbanItem.date), "d-MMM-y")}</p>
      </div>

      <div className="text-lg">{kanbanItem.title}</div>
    </div>
  );
}
