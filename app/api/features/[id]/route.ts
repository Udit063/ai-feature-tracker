import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { updateFeatureSchema } from "@/lib/validations/feature";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const featureId = Number(id);

    if (!Number.isInteger(featureId) || featureId <= 0) {
      return Response.json(
        { success: false, error: "Invalid feature ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const feature_to_update = updateFeatureSchema.safeParse(body);

    if (!feature_to_update.success) {
      return Response.json(
        { success: false, error: "Invalid request!" },
        { status: 400 },
      );
    }

    const updated_feature = await prisma.features.update({
      where: {
        id: featureId,
      },
      data: feature_to_update.data,
    });

    return Response.json(
      { success: true, feature: updated_feature },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update feature:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { success: false, error: "Feature not found!" },
        { status: 404 },
      );
    }

    return Response.json(
      { success: false, error: "Failed to update feature" },
      { status: 500 },
    );
  }
}
