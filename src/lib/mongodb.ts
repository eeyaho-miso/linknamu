import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

// 개발 중 핫 리로드로 연결이 계속 늘어나지 않도록 클라이언트를 전역에 재사용합니다.
export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo.mongoClientPromise) {
    // 연결에 실패하면 캐시를 비워 다음 요청에서 다시 시도합니다.
    globalForMongo.mongoClientPromise = new MongoClient(uri, {
      // IP 차단 등으로 연결이 안 될 때 기본 30초 대신 빨리 실패합니다.
      serverSelectionTimeoutMS: 5000,
    })
      .connect()
      .catch((error) => {
        globalForMongo.mongoClientPromise = undefined;
        throw error;
      });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;

  const client = await clientPromise;
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ linkId: string; count: number; updatedAt: Date }>("clicks");
}
