import { Add, ArrowUpward } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { conditionalCss } from "../../helpers/utils";
import { styles } from "./floatingActions.styles";


interface FloatingActionsProps {
  add?: string | (() => void);
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  add,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigate = useNavigate();

  const onClickAdd = () => {
    if (typeof add === "string") {
      navigate(add);
      return;
    }

    (add as () => void)();
  }

  const handleWindowScroll = useCallback(() => {
    if (!showScrollTop && window.scrollY >= window.innerHeight) {
      setShowScrollTop(true);
    } else if (showScrollTop && window.scrollY <= window.innerHeight * 0.5) {
      setShowScrollTop(false);
    }
  }, [showScrollTop]);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    handleWindowScroll();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    }
  }, [handleWindowScroll]);

  return (
    <div css={styles.floatingActionContainer}>
      {add && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={onClickAdd}
        >
          <Add htmlColor="white" />
        </Fab>
      )}

      <Fab
        size="small"
        color="primary"
        aria-label="Return to top"
        onClick={handleScrollTop}
        css={[styles.floatingActionTop, conditionalCss(showScrollTop, styles.floatingActionTopVisible)]}
      >
        <ArrowUpward />
      </Fab>
    </div>
  )
}