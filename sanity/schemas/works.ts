import {defineField, defineType} from 'sanity'

export default defineType({
    name:"presentation",
    title:'BuildyoursPresentation',
    type:'document',
    icon:()=>"X",
    fields:[
        defineField({
            name:'items',
            title:'Items',
            type:'array',
            validation:Rule=>Rule.required().min(1),
            of:[
                {
                    type:'object',
                    name:'presentationItem',
                    title:'PresentationItem',
                    fields:[
                        defineField({
                            name:'image',
                            title:'Image',
                            type:'image',
                            options:{
                                hotspot:true
                            },
                            validation:Rule=>Rule.required()
                        }),
                        defineField({
                            name:'title',
                            title:'Title',
                            type:'string',
                            validation:Rule=>Rule.required()
                        }),
                        defineField({
                            name:'description',
                            title:'Description',
                            type:'text',
                            rows:3,
                            validation: Rule=>Rule.required()
                        })
                    ]
                }
            ]
        })
    ]
})