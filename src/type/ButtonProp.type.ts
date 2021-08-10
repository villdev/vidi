export type ButtonPropTypes = {
  customClass?: string;
  variant: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  clickHandler?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  to?: string;
  loading?: boolean;
  children: React.ReactNode;
};
