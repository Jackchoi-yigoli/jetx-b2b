import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  link?: { href: string; label: string };
}

export default function Card({ children, title, link }: CardProps) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm">
      {(title || link) && (
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          {title && <div className="text-base font-semibold text-text-primary">{title}</div>}
          {link && (
            <a href={link.href} className="text-sm text-primary hover:text-primary-hover">
              {link.label}
            </a>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
