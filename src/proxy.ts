// Auth guard prepared — not active until login page exists

export function proxy() {
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
