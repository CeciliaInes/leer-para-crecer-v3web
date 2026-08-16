import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Historias',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string', validation: r => r.required().min(5)}),
    defineField({name: 'slug', title: 'URL', type: 'slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'excerpt', title: 'Resumen', type: 'text', rows: 3, validation: r => r.max(220)}),
    defineField({name: 'category', title: 'Categoría', type: 'string', options: {list: ['Historias','Lectura','Biblioteca','Comunidad','Actividades']}, initialValue: 'Historias'}),
    defineField({name: 'coverImage', title: 'Foto de portada', type: 'image', options: {hotspot: true}, fields: [defineField({name:'alt',title:'Texto alternativo',type:'string'})], validation: r => r.required()}),
    defineField({name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({name: 'body', title: 'Historia', type: 'blockContent'}),
  ],
  preview: {select: {title: 'title', media: 'coverImage', subtitle: 'category'}},
  orderings: [{title: 'Más recientes', name: 'publishedAtDesc', by: [{field:'publishedAt',direction:'desc'}]}],
})
