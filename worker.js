export default {
  async fetch(request) {
    const url = new URL(request.url);

    // handle /open/filename.html
    if (url.pathname.startsWith("/open/")) {
      const fileName = url.pathname.replace("/open/", "");

      const newUrl = `/view.html?file=${encodeURIComponent(fileName)}`;
      return Response.redirect(url.origin + newUrl, 302);
    }

    return fetch(request);
  }
};
