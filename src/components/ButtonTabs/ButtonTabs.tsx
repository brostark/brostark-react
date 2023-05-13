import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { ButtonTabsContext } from "./buttonTabs.context";
import { styles } from "./buttonTabs.styles";


interface ButtonTabsProps {
  className?: string;
  children?: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const ButtonTabs: React.FC<ButtonTabsProps> = ({
  children,
  className,
  defaultValue,
  onValueChange,
}) => {
  const [value, setValue] = useState(defaultValue || "");
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef(null);

  const contextValue = {
    value,
    setValue,
    activeIndex,
    setActiveIndex,
  };

  useEffect(() => {
    if (value && onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <ButtonTabsContext.Provider value={contextValue}>
      <div className={className} css={styles.tabsRoot}>
        <div css={styles.tabs} ref={tabsRef}>
          {React.Children.map(children, (child, index) => React.cloneElement(child as ReactElement, {
            index
          }))}
        </div>
      </div>
    </ButtonTabsContext.Provider>
  );
}
