import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { units } from "@/db/schema";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { unitId: string } } // <-- use string
) => {
  const admin = await isAdmin(); // <-- add await
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const unitId = Number(params.unitId); // <-- convert to number
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  if (!data) {
    return new NextResponse("Unit not found", { status: 404 });
  }

  const safeData = JSON.parse(
    JSON.stringify(data, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  );

  return NextResponse.json(safeData);
};

export const PUT = async (
  req: Request,
  { params }: { params: { unitId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const unitId = Number(params.unitId);
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  const body = await req.json();

  const updated = await db
    .update(units)
    .set(body)
    .where(eq(units.id, unitId))
    .returning();

  const safeUpdated = JSON.parse(
    JSON.stringify(updated[0], (_, v) => (typeof v === "bigint" ? Number(v) : v))
  );

  return NextResponse.json(safeUpdated);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { unitId: string } }
) => {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const unitId = Number(params.unitId);
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  const deleted = await db
    .delete(units)
    .where(eq(units.id, unitId))
    .returning();

  const safeDeleted = JSON.parse(
    JSON.stringify(deleted[0], (_, v) => (typeof v === "bigint" ? Number(v) : v))
  );

  return NextResponse.json(safeDeleted);
};
