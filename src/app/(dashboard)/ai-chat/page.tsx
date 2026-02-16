"use client";

import React, { useState } from "react";
import { Send, Settings, Plus, ArrowLeft, MessageSquare, BarChart3, Calendar, DollarSign } from "lucide-react";

const SUGGESTIONS = [
  { icon: DollarSign, title: "Budget Analysis", description: "What's the total value of my active projects?" },
  { icon: Calendar, title: "Schedule Review", description: "Which projects have bids due this month?" },
  { icon: BarChart3, title: "Win Rate", description: "What's our win rate for commercial projects?" },
];

const RECENT_CHATS = [
  { id: "1", title: "Q1 Pipeline Analysis", date: "Feb 15, 2024" },
  { id: "2", title: "Workforce Utilization Q&A", date: "Feb 12, 2024" },
  { id: "3", title: "Cost Comparison - Office Projects", date: "Feb 8, 2024" },
];

export default function AiChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-1 overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 shrink-0 border-r border-gray-700 bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <button className="flex w-full items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-600">
            <Plus className="h-4 w-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <p className="px-3 py-1 text-xs font-medium text-gray-500">Recents</p>
          {RECENT_CHATS.map((chat) => (
            <button key={chat.id} className="flex w-full flex-col rounded-md px-3 py-2 text-left hover:bg-gray-700">
              <span className="text-sm text-gray-200 truncate">{chat.title}</span>
              <span className="text-xs text-gray-500">{chat.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white">New Chat</h1>
          <p className="mb-8 text-gray-400">Ask me anything about your data</p>

          <div className="mb-8 grid grid-cols-3 gap-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.title}
                className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-left hover:border-gray-600 hover:bg-gray-750"
              >
                <s.icon className="mb-2 h-5 w-5 text-emerald-400" />
                <p className="text-sm font-medium text-gray-200">{s.title}</p>
                <p className="mt-1 text-xs text-gray-500">{s.description}</p>
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your projects, pipeline, forecasts..."
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none resize-none"
              rows={2}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-400">
                <Settings className="h-4 w-4" />
              </button>
              <button className="rounded-md bg-emerald-600 p-1.5 text-white hover:bg-emerald-500 disabled:opacity-50" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
