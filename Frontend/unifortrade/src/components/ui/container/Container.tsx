import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export default function Container({ as: Component = "div", children, className }: ContainerProps) {
  return (
    <Component className={[styles.container, className].filter(Boolean).join(" ")}>
      {children}
    </Component>
  );
}
