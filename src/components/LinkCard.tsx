"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ id, title, url }: LinkItem) {
  // 페이지를 떠나도 요청이 전송되도록 keepalive를 사용합니다.
  const recordClick = () => {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="block w-full rounded-xl border-2 border-neutral-900 bg-white px-5 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:bg-emerald-50 active:translate-y-0"
    >
      {title}
    </a>
  );
}
