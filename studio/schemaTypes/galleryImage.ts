import {defineType, defineField} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galería',
  type: 'document',
  fields: [
    defineField({name:'title',title:'Título',type:'string'}),
    defineField({name:'category',title:'Categoría',type:'string',options:{list:['Biblioteca','Lectura','Comunidad','Actividades']},initialValue:'Biblioteca'}),
    defineField({name:'image',title:'Fotografía',type:'image',options:{hotspot:true},validation:r=>r.required()}),
    defineField({name:'alt',title:'Texto alternativo',type:'string'}),
  ],
  preview:{select:{title:'title',media:'image',subtitle:'category'}},
})
