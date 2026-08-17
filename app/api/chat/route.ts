export async function GET(request: Request) {
  return Response.json({
    message: "Hello world!",
    status: "success",
  });
}

export async function POST(request: Request) {
  const res = await request.json();
  const message = res.message;
  return Response.json({ 
    message: "I've prepared a feature proposal for Google authentication.",
    proposal: {
      title: "Google Authentication",
      description: "Add Google authentication for users.",
    }
   });
}
