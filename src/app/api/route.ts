export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const audio = searchParams.get("audio");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audio}`)
    return res
  }