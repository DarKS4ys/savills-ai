import { ChatGPTMessage } from "@/@types";
import { Message } from "ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hi! I am your PDF assistant. I am happy to help with your questions about your PDF 😊",
  },
];


export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

// Reference:
// github.com/hwchase17/langchainjs/blob/357d6fccfc78f1332b54d2302d92e12f0861c12c/examples/src/guides/expression_language/cookbook_conversational_retrieval.ts#L61
export const formatChatHistory = (chatHistory: [string, string][]) => {
  const formattedDialogueTurns = chatHistory.map(
    (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
  );

  return formattedDialogueTurns.join("\n");
};

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

// Default UI Message

// Maps the sources with the right ai-message
export const getSources = (data: any, role: string, index: number) => {
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;
    }
  }
  return [];
}

export const truncateText = (text: string | null | undefined, chars: number): string => {
  if (text && text.length > chars) {
    return text.substring(0, chars) + '...';
  }
  
  if (text) {
    return text;
  } else {
    return 'Loading...'
  }
};

export const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string') {
      return false
  }

  return true
}

export const extractErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong!'
  }

  return message
}