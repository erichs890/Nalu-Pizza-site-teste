// Saber, no build, se uma foto já existe em src/assets/fotos.
const fotos = import.meta.glob('/src/assets/fotos/**/*.{jpg,jpeg,png,webp,avif}');
export const existeFoto = (caminho: string) => `/src/assets/fotos/${caminho}` in fotos;
