export const format_url_for_sitemap = (url: string) => {
  try {
    return decodeURIComponent(
      url.replace(/^https?:\/\//, "").replace(/^[^/]+/, "")
    )
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^[^/]+/, "")
  }
}

export const format_url_for_history = (url: string) => {
  return url.replace(/^https?:\/\//, "")
}
