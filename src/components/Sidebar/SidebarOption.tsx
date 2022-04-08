import React from "react";
import "../../style/Sidebar.css";
import { useViewport } from "../../context/viewportContext";

type Props = {
  Icon: React.ElementType;
  text: string;
  active?: boolean;
};

function SidebarOption({ Icon, text, active = false }: Props) {
  const breakpoint = 768;
  const { width } = useViewport();

  return (
    <div
      className={`sidebar__option ${active ? "sidebar__option--active" : ""}`}
    >
      <Icon />
      {width < breakpoint ? null : <span>{text}</span>}
    </div>
  );
}

export default SidebarOption;
