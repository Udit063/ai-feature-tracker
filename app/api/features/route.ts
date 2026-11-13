import { prisma } from "@/lib/prisma";
import { featureProposalSchema } from "@/lib/validations/feature";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = featureProposalSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    const data = result.data;

    const feature = await prisma.features.create({
      data: {
        title: data.title,
        status: "upcoming",
        description: data.description,
      },
    });

    return Response.json(
      {
        success: true,
        feature: feature,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Failed to create error", error);

    return Response.json(
      { success: false, error: "Failed to create feature!" },
      {
        status: 500,
      },
    );
  }
}