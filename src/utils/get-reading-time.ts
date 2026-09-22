const getReadingTime = (body?: string): number | undefined => {
  const wordCount = body ? body.split(/\s+/).filter(Boolean).length : 0;

  return wordCount > 0 ? Math.max(1, Math.round(wordCount / 200)) : undefined;
};

export { getReadingTime };
