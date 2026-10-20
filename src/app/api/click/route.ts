import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

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
