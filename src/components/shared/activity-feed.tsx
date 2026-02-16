"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { Bold, Italic, List, ListOrdered, AtSign, Paperclip } from "lucide-react";

interface ActivityItem {
  id: string;
  user: { firstName: string; lastName: string; photoUrl?: string };
  type: string;
  content: string;
  createdAt: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  entityType?: string;
  entityId?: string;
}

export function ActivityFeed({ activities, entityType, entityId }: ActivityFeedProps) {
  const [comment, setComment] = useState("");

  return (
    <div>
      {/* Comment Input */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2">
          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <Bold className="h-4 w-4" />
          </button>
          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <Italic className="h-4 w-4" />
          </button>
          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <List className="h-4 w-4" />
          </button>
          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <ListOrdered className="h-4 w-4" />
          </button>
          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <AtSign className="h-4 w-4" />
          </button>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full resize-none border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400"
          rows={3}
        />
        <div className="flex items-center justify-between border-t border-gray-200 px-3 py-2">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip className="h-4 w-4" />
          </button>
          <Button size="sm" disabled={!comment.trim()}>
            Comment
          </Button>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <Avatar
              firstName={activity.user.firstName}
              lastName={activity.user.lastName}
              photoUrl={activity.user.photoUrl}
              size="sm"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {activity.user.firstName} {activity.user.lastName}
                </span>
                <span className="text-xs text-gray-400">
                  {formatRelativeTime(activity.createdAt)}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-600">{activity.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
