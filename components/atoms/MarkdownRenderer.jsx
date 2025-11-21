import React from 'react';
import Markdown from 'react-markdown';

export const MarkdownRenderer = ({ content, className = '', small = false }) => {
  const proseSize = small ? 'prose-sm' : '';
  return (
    <div className={`prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black prose-pre:border prose-pre:border-zinc-800 prose-pre:p-2 prose-code:text-rust-300 prose-code:bg-zinc-800/50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none ${proseSize} ${className}`}>
      <Markdown>{content}</Markdown>
    </div>
  );
};