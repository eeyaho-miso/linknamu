import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 현재 클릭 수를 { [linkId]: count } 형태로 한 번에 돌려줍니다.
export async function GET() {
  // 빌드 시 미리 렌더링하지 않고 요청마다 최신 값을 읽습니다.
  await connection();

  const clicks = await getClicksCollection();
  if (!clicks) {
    return Response.json(
      { error: "MONGODB_URI가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const linkIds = profile.links.map((link) => link.id);
  const docs = await clicks
    .find({ linkId: { $in: linkIds } }, { projection: { _id: 0, linkId: 1, count: 1 } })
    .toArray();

  const counts: Record<string, number> = Object.fromEntries(
    linkIds.map((id) => [id, 0]),
  );
  for (const doc of docs) counts[doc.linkId] = doc.count;

  return Response.json({ counts });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const linkId = typeof body?.linkId === "string" ? body.linkId : null;

  if (!linkId || !profile.links.some((link) => link.id === linkId)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clicks = await getClicksCollection();
  if (!clicks) {
    return Response.json(
      { error: "MONGODB_URI가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  await clicks.updateOne(
    { linkId },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true },
  );

  return Response.json({ ok: true });
}
