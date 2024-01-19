import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@/libs/mongoConnect";
import { Category } from "@/models/Category";

export async function POST(req) {
  await mongooseConnect();
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  await mongooseConnect();
  const { _id, name } = await req.json();
  if (await isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }
  return Response.json(true);
}

export async function GET() {
  await mongooseConnect();
  return Response.json(
    await Category.find()
  );
} 

export async function DELETE(req) {
  await mongooseConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}