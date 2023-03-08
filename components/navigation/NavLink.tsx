import cx from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { Children } from "react";

export type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  activeClassName?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  React.RefAttributes<HTMLAnchorElement>;

export const NavLink = ({
  children,
  activeClassName = "active",
  ...props
}: NavLinkProps) => {
  const { asPath } = useRouter();

  const child = Children.only(children) as React.ReactElement;
  const childClassName = child.props.className || "";

  const isActive = asPath === props.href || asPath === props.as;
  // console.log(`${props.href}:${isActive}`);

  const className = cx(childClassName);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
export default NavLink;
