import {defineType, defineArrayMember, defineField} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({type: 'block', styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'Título 2', value: 'h2'},
      {title: 'Título 3', value: 'h3'},
      {title: 'Cita', value: 'blockquote'},
    ], marks: {decorators: [{title: 'Negrita', value: 'strong'}, {title: 'Cursiva', value: 'em'}]}}),
    defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})]}),
  ],
})
