import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { challenges } from "@/db/schema";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

// GET /api/challenges/[challengeId]
export const GET = async (
  req: Request,
  { params }: { params: { challengeId: string } } // string not number
) => {
  const admin = await isAdmin(); // ✅ await
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeId = Number(params.challengeId);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!data) {
    return new NextResponse("challenge not found", { status: 404 });
  }

  const safeData = JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeData);
};

// PUT /api/challenges/[challengeId]
export const PUT = async (
  req: Request,
  { params }: { params: { challengeId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeId = Number(params.challengeId);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const body = await req.json();

  const updated = await db
    .update(challenges)
    .set(body)
    .where(eq(challenges.id, challengeId))
    .returning();

  const safeUpdated = JSON.parse(
    JSON.stringify(updated[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeUpdated);
};

// DELETE /api/challenges/[challengeId]
export const DELETE = async (
  req: Request,
  { params }: { params: { challengeId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeId = Number(params.challengeId);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const deleted = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  const safeDeleted = JSON.parse(
    JSON.stringify(deleted[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeDeleted);
};
