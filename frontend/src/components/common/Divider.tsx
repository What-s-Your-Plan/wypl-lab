import { ReactNode } from 'react';

function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
    </div>
  );
}

function DividerY() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="h-full border-l border-gray-300" />
      </div>
    </div>
  );
}

type DividerLabelProps = {
  children: React.ReactNode;
};

function DividerLabel({ children }: DividerLabelProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-default-white px-2 text-sm text-gray-500">
          {children}
        </span>
      </div>
    </div>
  );
}

export { Divider, DividerY, DividerLabel };
