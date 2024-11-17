# Component Guidelines

## Component Organization

### Directory Structure
```
/components
├── ui/              # Base shadcn components & variants
│   ├── button.tsx
│   ├── form.tsx
│   └── variants/    # Custom variants
├── sections/        # Page sections
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── Pricing.tsx
├── booking/         # Booking system components
│   ├── AddressForm/
│   ├── ServiceSelect/
│   └── PricingSummary/
├── dashboard/       # Dashboard components
│   ├── customer/
│   ├── cleaner/
│   └── admin/
└── layout/         # Layout components
    ├── Header/
    ├── Footer/
    └── Sidebar/
```

## Component Patterns

### 1. Base Component Structure
```tsx
// components/ui/button.tsx
import { cn } from "@/lib/utils";
import { ButtonProps } from "./types";

export function Button({ 
  className, 
  variant = "default",
  size = "md",
  children,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={cn(
        "base-styles",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. Section Components
```tsx
// components/sections/Hero.tsx
import { HeroProps } from "./types";

export default function Hero({
  title,
  description,
  image,
  cta
}: HeroProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Component content */}
      </div>
    </section>
  );
}
```

### 3. Form Components
```tsx
// components/booking/AddressForm/index.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "./schema";

export default function AddressForm() {
  const form = useForm({
    resolver: zodResolver(addressSchema)
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

## Best Practices

### 1. Component Organization

- One component per file
- Group related components in folders
- Include index.ts for clean exports
- Co-locate component types and schemas

```tsx
// components/booking/AddressForm/
├── index.tsx        # Main component
├── types.ts         # TypeScript types
├── schema.ts        # Zod schema
└── styles.ts        # Component styles
```

### 2. Props & Types

```tsx
// types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// Prop defaults
const defaultProps = {
  variant: "default",
  size: "md",
  isLoading: false
};
```

### 3. Styling Guidelines

```tsx
// Use Tailwind classes with cn utility
import { cn } from "@/lib/utils";

const styles = {
  base: "rounded-lg font-medium transition-colors",
  variants: {
    primary: "bg-primary text-primary-content hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary/90"
  },
  sizes: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  }
};

export function Button({ className, variant, size, ...props }) {
  return (
    <button 
      className={cn(
        styles.base,
        styles.variants[variant],
        styles.sizes[size],
        className
      )}
      {...props}
    />
  );
}
```

### 4. Client vs Server Components

```tsx
// Server Component (default)
export default function StaticSection() {
  return <div>Static Content</div>;
}

// Client Component
"use client";

export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>Interactive Content</div>;
}
```

### 5. Error Handling

```tsx
export default function Component() {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div role="alert" className="text-error">
        <h3>Something went wrong</h3>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return <div>Component Content</div>;
}
```

## Component Testing

### 1. Unit Tests
```tsx
// components/ui/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies variant styles", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });
});
```

### 2. Integration Tests
```tsx
// components/booking/AddressForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { AddressForm } from "./AddressForm";

describe("AddressForm", () => {
  it("validates required fields", async () => {
    render(<AddressForm />);
    
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(await screen.findByText(/address is required/i)).toBeInTheDocument();
  });
});
```

## Performance Guidelines

### 1. Code Splitting
```tsx
// Lazy load heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>
});
```

### 2. Image Optimization
```tsx
import Image from "next/image";

export function OptimizedImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      placeholder="blur"
      loading="lazy"
    />
  );
}
```

### 3. Memoization
```tsx
import { memo } from "react";

function ExpensiveComponent({ data }) {
  // Heavy computations
  return <div>{/* Rendered content */}</div>;
}

export default memo(ExpensiveComponent);
```

## Accessibility Guidelines

### 1. ARIA Labels
```tsx
export function IconButton({ icon, label }) {
  return (
    <button
      aria-label={label}
      className="p-2 rounded-full"
    >
      {icon}
    </button>
  );
}
```

### 2. Keyboard Navigation
```tsx
export function NavigationMenu() {
  return (
    <nav>
      <ul role="menubar">
        <li role="menuitem" tabIndex={0}>
          <a href="#features">Features</a>
        </li>
      </ul>
    </nav>
  );
}
```

## Documentation Standards

### 1. Component Documentation
```tsx
/**
 * Primary button component with multiple variants
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {boolean} isLoading - Loading state
 * @example
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 */
export function Button({ variant, size, isLoading, children }) {
  // Component implementation
}
```

### 2. Props Documentation
```tsx
interface Props {
  /** The title displayed at the top */
  title: string;
  /** Description text shown below the title */
  description?: string;
  /** Callback fired when the primary action is clicked */
  onAction: () => void;
}
```