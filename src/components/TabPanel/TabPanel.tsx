import React from "react";


export interface ITabPanelProps {
  hidden?: boolean;
  className?: string;
  children: React.ReactNode;
}


const TabPanel: React.FC<ITabPanelProps> = ({
  hidden,
  children,
  className,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      className={className}
    >
      {!hidden && children}
    </div>
  )
}


export default TabPanel;
