import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// GET - List all blogs (admin view, includes unpublished)
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title: body.title,
          excerpt: body.excerpt || "",
          content_url: body.content_url || "",
          cover_image: body.cover_image || "",
          tags: body.tags || [],
          is_published: body.is_published ?? true,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a blog
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("blogs")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Blog deleted" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
