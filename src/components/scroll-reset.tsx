"use client";

import { useEffect } from "react";

export function ScrollResetOnMount() {
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch {}
  }, []);
  return null;
}
