import Link from 'next/link';
import { ChevronRightIcon } from './Icons';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-theme-secondary mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
          )}
          {index === items.length - 1 ? (
            <span className="text-theme-primary font-medium">{item.label}</span>
          ) : (
            <Link 
              href={item.href} 
              className="hover:text-theme-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
