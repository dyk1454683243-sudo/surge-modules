function safeDone(body) {
  $done({ body });
}

try {
  const url = $request.url || "";
  const body = $response.body || "";
  const len = body.length;

  let hit = {
    url,
    length: len,
    hasSku: false,
    hasPrice: false,
    hasTitle: false,
    hasWare: false
  };

  if (body.includes("sku")) hit.hasSku = true;
  if (body.includes("price")) hit.hasPrice = true;
  if (body.includes("title")) hit.hasTitle = true;
  if (body.includes("ware")) hit.hasWare = true;

  console.log("[JD-HIT] " + JSON.stringify(hit));

  safeDone(body);
} catch (e) {
  console.log("[JD-HIT-ERROR] " + String(e));
  safeDone($response.body);
}
