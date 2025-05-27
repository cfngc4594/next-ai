import type { HTMLAttributes } from "react";
import type { MDXProvider } from "@mdx-js/react";
import { Pre } from "@/components/mdx/components/pre";

export type MDXComponents = React.ComponentProps<typeof MDXProvider>["components"];

export const mdxComponents: MDXComponents = {
  pre: (props: HTMLAttributes<HTMLPreElement>) => <Pre {...props} />,
};
