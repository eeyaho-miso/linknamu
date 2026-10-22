"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/click", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.counts) setCounts(data.counts);
      })
      .catch((error) => console.warn("클릭 수를 불러오지 못했습니다.", error));
  }, []);

  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            {...link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
