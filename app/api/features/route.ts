import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const features = await prisma.features.findMany();

    return Response.json({ success: true, features });
  } catch (error) {
    console.error("Database query failed:", error);

    return Response.json(
      { success: false, error: "Database query failed" },
      { status: 500 },
    );
  }
}
