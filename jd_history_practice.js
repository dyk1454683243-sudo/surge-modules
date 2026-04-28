function done(body) {
  $done({ body });
}

try {
  const url = $request.url || "";
  const body = $response.body || "";
  const host = (() => {
    try { return new URL(url).host; } catch { return ""; }
  })();

  const keywords = [
    "Bellroy",
    "Venture Sling",
    "探险家胸包",
    "1139"
  ];

  const hits = keywords.filter(k => body.includes(k));

  const info = {
    host,
    url,
    length: body.length,
    hits
  };

  if (hits.length > 0) {
    console.log("[JD-FIND-HIT] " + JSON.stringify(info));
  } else {
    console.log("[JD-FIND-MISS] " + JSON.stringify({
      host,
      url,
      length: body.length
    }));
  }

  done(body);
} catch (e) {
  console.log("[JD-FIND-ERROR] " + String(e));
  done($response.body);
}
