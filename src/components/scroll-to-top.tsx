"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!showButton && document.activeElement === buttonRef.current) {
      buttonRef.current?.blur();
    }
  }, [showButton]);

  return (
    <Button
      ref={buttonRef}
      size="icon"
      variant="transparent"
      className={`fixed bottom-5 right-5 w-1 h-fit sm:w-10 hover:bg-accent/80 transition-all duration-300 ease-out hover:scale-110 ${
        showButton ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-label="ページ上部へ戻る"
      inert={!showButton}
      tabIndex={showButton ? 0 : -1}
      onClick={scrollToTop}
    >
      <Image
        src="/pointing-finger.png"
        alt="ページ上部へ戻る"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </Button>
  );
}
