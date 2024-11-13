async function getOgImage(url: string) {
  const params = new URLSearchParams({
    url: url,
  });

  const response = await fetch(`/api/og?${params}`);
  const og = await response.json();
  return og;
}

export { getOgImage };
