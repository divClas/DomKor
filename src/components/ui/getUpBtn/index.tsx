import { useState, useEffect } from "react";
import { ReactComponent as ArrowTop } from "@/assets/arrowTop.svg";

export const ScrollUpButtonUi = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button className="arrow-top" onClick={scrollToTop}>
        <ArrowTop />
      </button>
    )
  );
};
