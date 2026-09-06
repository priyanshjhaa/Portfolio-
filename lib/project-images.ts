const projectImageDimensions: Record<string, { width: number; height: number }> = {
  sprout: { width: 1909, height: 991 },
  atlas: { width: 1899, height: 993 },
  execute: { width: 2924, height: 1610 },
  codemap: { width: 1907, height: 956 },
  axiom: { width: 1912, height: 990 },
  cinematch: { width: 1895, height: 995 },
};

export function getProjectImageAspectRatio(projectId: string) {
  const dimensions = projectImageDimensions[projectId];
  return dimensions ? `${dimensions.width} / ${dimensions.height}` : '16 / 9';
}
