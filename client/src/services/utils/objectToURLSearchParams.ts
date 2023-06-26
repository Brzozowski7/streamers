export const objectToURLSearchParams = (
  object: Record<string, unknown> | undefined,
) => {
  if (!object) return '';

  const params = new URLSearchParams();
  const entries = Object.entries(object);
  for (const [key, value] of entries) {
    if (value === undefined || value === '') {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(`${key}[]`, item);
      }
      continue;
    }

    params.append(key, `${value}`);
  }
  const searchParams = params.toString() ? '?' + params.toString() : '';

  return searchParams;
};
