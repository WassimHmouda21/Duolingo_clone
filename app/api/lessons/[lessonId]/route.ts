import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { lessons } from "@/db/schema";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

// GET /api/lessons/[lessonId]
export const GET = async (
  req: Request,
  { params }: { params: { lessonId: string } } // string not number
) => {
  const admin = await isAdmin(); // ✅ await
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const lessonId = Number(params.lessonId);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  if (!data) {
    return new NextResponse("Lesson not found", { status: 404 });
  }

  const safeData = JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeData);
};

// PUT /api/lessons/[lessonId]
export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const lessonId = Number(params.lessonId);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  const body = await req.json();

  const updated = await db
    .update(lessons)
    .set(body)
    .where(eq(lessons.id, lessonId))
    .returning();

  const safeUpdated = JSON.parse(
    JSON.stringify(updated[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeUpdated);
};

// DELETE /api/lessons/[lessonId]
export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const lessonId = Number(params.lessonId);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  const deleted = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning();

  const safeDeleted = JSON.parse(
    JSON.stringify(deleted[0], (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

  return NextResponse.json(safeDeleted);
};
