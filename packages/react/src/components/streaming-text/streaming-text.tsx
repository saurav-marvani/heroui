"use client";

import React, {useEffect, useState} from "react";

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  speed?: number;
  onStreamComplete?: () => void;
  className?: string;
}

export const StreamingText = React.forwardRef<HTMLDivElement, StreamingTextProps>(
  ({text, isStreaming, speed = 30, onStreamComplete, className = ""}, ref) => {
    const [displayedText, setDisplayedText] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (!isStreaming) {
        setDisplayedText(text);
        setProgress(100);
        onStreamComplete?.();
        return;
      }

      setDisplayedText("");
      setProgress(0);
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          setProgress(Math.round(((index + 1) / text.length) * 100));
          index++;
        } else {
          clearInterval(interval);
          onStreamComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, [text, isStreaming, speed, onStreamComplete]);

    const wordCount = displayedText.split(/\s+/).filter((w) => w.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    return (
      <div ref={ref} className={`w-full space-y-2 ${className}`} data-component="streaming-text">
        <div className="prose prose-sm max-w-none dark:prose-invert p-4 bg-surface rounded border border-divider min-h-32 whitespace-pre-wrap">
          {displayedText}
          {isStreaming && <span className="animate-pulse">|</span>}
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-foreground-secondary px-4">
          <span>{displayedText.length} characters</span>
          <span>{wordCount} words</span>
          {wordCount > 0 && <span>{readingTime} min read</span>}
          {isStreaming && <span>{progress}%</span>}
        </div>

        {/* Progress Bar */}
        {isStreaming && (
          <div className="w-full h-1 bg-divider rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{width: `${progress}%`}} />
          </div>
        )}
      </div>
    );
  },
);

StreamingText.displayName = "StreamingText";
