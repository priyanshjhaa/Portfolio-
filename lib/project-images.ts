const projectImageDimensions: Record<string, { width: number; height: number }> = {
  atlas: { width: 2918, height: 1664 },
  execute: { width: 2924, height: 1610 },
  codemap: { width: 1907, height: 956 },
  axiom: { width: 1912, height: 990 },
  cinematch: { width: 1895, height: 995 },
};

export function getProjectImageAspectRatio(projectId: string) {
  const dimensions = projectImageDimensions[projectId];
  return dimensions ? `${dimensions.width} / ${dimensions.height}` : '16 / 9';
}
