function safeDone(body) {
  $done({ body });
}

try {
  const raw = $response.body || "";
  const obj = JSON.parse(raw);

  obj.__history_price_test__ = "历史价练习模块已命中";

  if (Array.isArray(obj.data)) {
    obj.data = obj.data.map((item) => {
      if (item && typeof item === "object") {
        if (typeof item.name === "string" && item.name.length > 0) {
          item.name = item.name + "｜历史最低¥1999";
        }

        if (typeof item.openapp === "string" && item.openapp.includes("show_query=")) {
          item.openapp = item.openapp.replace(
            /show_query=[^&"]+/,
            "show_query=" + encodeURIComponent("历史最低价¥1999")
          );
        }
      }
      return item;
    });
  }

  safeDone(JSON.stringify(obj));
} catch (e) {
  safeDone($response.body);
}
