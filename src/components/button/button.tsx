import React, { type FC } from "react";

import cn from "classnames";
import { Link } from "gatsby";

import * as styles from "@/assets/styles/modules/button.module.scss";

interface ButtonProps {
  className?: string;
  title: string;
  to: string;
}

const Button: FC<ButtonProps> = ({ className, title, to }) => (
  <Link className={cn(styles.button, className)} to={to}>
    {title}
  </Link>
);

export { Button };
