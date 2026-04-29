export async function onRequest(context) {
  const url = new URL(context.request.url);

  // ambil nama file dari path
  const filePath = url.pathname.replace("/open/", "");

  // redirect ke view.html + query
  return Response.redirect(
    `${url.origin}/view.html?file=${encodeURIComponent(filePath)}`,
    302
  );
}
