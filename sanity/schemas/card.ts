import {defineField, defineType, defineArrayMember} from "sanity"

export default defineType({
    name:'card',
    title:'Card',
    type:'document',
    icon:'X',
    fields:[
        defineField({
            name:'cardItem',
            title:'CardItem',
            type:'array',
            validation: Rule=>Rule.required().min(1),
            of:[
                {
                    name:'item',
                    title:'Item',
                    type:'object',
                    fields:[
                        defineField({
                            name:'title',
                            title:'Title',
                            type:'string',
                            validation: Rule=>Rule.required()
                        }),
                        defineField({
                            name:'image',
                            title:'Image',
                            type:'array',
                            of:[
                                defineArrayMember({
                                    name:'imageitem',
                                    title:'ImageItem',
                                    type:'image',
                                    options:{
                                        hotspot:true
                                    },
                                    validation: Rule=>Rule.required() 
                                })
                            ]
                                               
                        }),
                        defineField({
                            name:'description',
                            title:'Description',
                            type:'text',
                            validation: Rule=>Rule.required()
                        }),
                        defineField({
                            name:'blog',
                            title:'Blog',
                            type:'reference',
                            to:[{type:'Blogs'}]
                        })
                    ]
                }
            ]
        })
    ]
})