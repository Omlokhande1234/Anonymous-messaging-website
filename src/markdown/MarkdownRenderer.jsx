import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code className={className} {...props}>
                {String(children).replace(/\n$/, '')}
              </code>
            </pre>
          ) : (
            <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
