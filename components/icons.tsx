import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WhatsAppIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.8 1.9c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .3-.1 1.3-.6 1.8-.5.6-1.4.9-2.3.7-1-.2-2.2-.7-3.8-2.1-1.3-1.2-2.3-2.7-2.7-3.6-.4-.9-.1-2.3.4-2.9l.6-.2Z"/></svg>;
}

export function ArrowIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
}

export function InstagramIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>;
}

export function PhoneIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>;
}

export function LocationIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

export function ClockIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
