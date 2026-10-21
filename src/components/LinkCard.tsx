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

  // mailto 같은 링크는 새 탭 없이 바로 엽니다.
  const isExternal = url.startsWith("http");

  return (
    <a
      href={url}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={recordClick}
      className="block w-full rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-center font-medium text-stone-700 shadow-[0_4px_20px_-8px_rgba(150,90,50,0.25)] backdrop-blur-md transition duration-200 hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_24px_-10px_rgba(150,90,50,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0"
    >
      {title}
    </a>
  );
}
