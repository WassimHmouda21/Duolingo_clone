import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { challengeOptions } from "@/db/schema";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

// GET /api/challengeOptions/[challengeOptionId]
export const GET = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } } // string not number
) => {
  const admin = await isAdmin(); // ✅ await
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeOptionId = Number(params.challengeOptionId);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, challengeOptionId),
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

// PUT /api/challengeOptions/[challengeOptionId]
export const PUT = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeOptionId = Number(params.challengeOptionId);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const body = await req.json();

  const updated = await db
    .update(challengeOptions)
    .set(body)
    .where(eq(challengeOptions.id, challengeOptionId))
    .returning();

  const safeUpdated = JSON.parse(
    JSON.stringify(updated[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeUpdated);
};
// DELETE /api/challengeOptions/[challengeOptionId]
export const DELETE = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const challengeOptionId = Number(params.challengeOptionId);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge ID", { status: 400 });
  }

  const deleted = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, challengeOptionId))
    .returning();

  const safeDeleted = JSON.parse(
    JSON.stringify(deleted[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeDeleted);
};
