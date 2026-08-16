export const galleryImages = Array.from({ length: 68 }, (_, index) => ({
  id: index + 1,
  src: `/gallery/${String(index + 1).padStart(2, '0')}.webp`,
  category: index % 4 === 0 ? 'Biblioteca' : index % 4 === 1 ? 'Lectura' : index % 4 === 2 ? 'Comunidad' : 'Actividades',
  caption: [
    'Niños descubriendo nuevas historias',
    'Un espacio para imaginar y aprender',
    'Lectura que se comparte',
    'Nuestra biblioteca cobra vida',
    'Comunidad alrededor de los libros',
    'Cada página abre una posibilidad',
  ][index % 6],
}))

export const bannerImages = [
  '/gallery/04.webp',
  '/gallery/13.webp',
  '/gallery/50.webp',
  '/gallery/66.webp',
]

export const localPosts = [
  {
    _id: 'local-1',
    title: 'Una biblioteca que crece con su comunidad',
    slug: { current: 'una-biblioteca-que-crece-con-su-comunidad' },
    excerpt: 'Cada encuentro, cada libro compartido y cada niño que se sienta a leer suma una nueva raíz a este proyecto.',
    publishedAt: '2026-08-10',
    category: 'Historias',
    coverImage: '/gallery/13.webp',
  },
  {
    _id: 'local-2',
    title: 'Leer también es imaginar futuros',
    slug: { current: 'leer-tambien-es-imaginar-futuros' },
    excerpt: 'Los espacios de lectura se convierten en lugares donde aprender, crear y encontrarse con otros.',
    publishedAt: '2026-07-28',
    category: 'Lectura',
    coverImage: '/gallery/49.webp',
  },
  {
    _id: 'local-3',
    title: 'Gracias por hacer crecer esta historia',
    slug: { current: 'gracias-por-hacer-crecer-esta-historia' },
    excerpt: 'Libros, tiempo, voluntariado y colaboración: muchas formas de ayudar a que una biblioteca siga creciendo.',
    publishedAt: '2026-07-12',
    category: 'Comunidad',
    coverImage: '/gallery/66.webp',
  },
]
