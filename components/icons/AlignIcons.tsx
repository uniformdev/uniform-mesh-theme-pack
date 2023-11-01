import { FC, SVGProps } from 'react';

export const TopAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="17"
    viewBox="0 0 22 17"
    fill="currentColor"
    {...props}
  >
    <rect width="22" height="2" />
    <rect x="4" y="4" width="6" height="13" rx="1" />
    <rect x="12" y="4" width="6" height="8" rx="1" />
  </svg>
);

export const VerticalCenterAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="13"
    viewBox="0 0 22 13"
    fill="currentColor"
    {...props}
  >
    <rect x="4" width="6" height="13" rx="1" />
    <rect y="6" width="22" height="2" />
    <rect x="12" y="3" width="6" height="8" rx="1" />
  </svg>
);

export const BottomAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="currentColor"
    {...props}
  >
    <rect y="14" width="22" height="2" />
    <rect x="4" width="6" height="13" rx="1" />
    <rect x="12" y="5" width="6" height="8" rx="1" />
  </svg>
);

export const LeftAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="22"
    viewBox="0 0 17 22"
    fill="currentColor"
    {...props}
  >
    <rect y="22" width="22" height="2" transform="rotate(-90 0 22)" />
    <rect x="4" y="18" width="6" height="13" rx="1" transform="rotate(-90 4 18)" />
    <rect x="4" y="10" width="6" height="8" rx="1" transform="rotate(-90 4 10)" />
  </svg>
);

export const HorizontalCenterAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="22"
    viewBox="0 0 13 22"
    fill="currentColor"
    {...props}
  >
    <rect y="18" width="6" height="13" rx="1" transform="rotate(-90 0 18)" />
    <rect x="6" y="22" width="22" height="2" transform="rotate(-90 6 22)" />
    <rect x="3" y="10" width="6" height="8" rx="1" transform="rotate(-90 3 10)" />
  </svg>
);

export const RightAlignIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="22"
    viewBox="0 0 16 22"
    fill="currentColor"
    {...props}
  >
    <rect x="14" y="22" width="22" height="2" transform="rotate(-90 14 22)" />
    <rect y="18" width="6" height="13" rx="1" transform="rotate(-90 0 18)" />
    <rect x="5" y="10" width="6" height="8" rx="1" transform="rotate(-90 5 10)" />
  </svg>
);
