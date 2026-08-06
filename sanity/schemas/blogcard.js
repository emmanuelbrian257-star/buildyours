import {defineField, defineType, defineArrayMember} from "sanity"

export default defineType({
    name:'blogcard',
    title:'BlogCard',
    type:'document',
    icon:'X',
    fields:[
        defineField({
            name:'card',
            title:'CardName',
            type:'array',
            validation: Rule=>Rule.required().min(1),
            of:[
                {
                    name:'item',
                    title:'Item',
                    type:'object',
                    fields:[
                        defineField({
                            name:'backgroundImage',
                            title:'BackgroundImage',
                            type:'image',
                            options:{
                                hotspot:true
                            },
                            validation: Rule=>Rule.required()
                        }),
                        defineField({
                            name:'heading',
                            title:'HeadingInfo',
                            type:'array',
                            of:[
                                defineArrayMember({
                                    name:'headingItem',
                                    title:'HeadingItem',
                                    type:'object',
                                    fields:[
                                        defineField({
                                            name:'headingTitle',
                                            title:'HeadingTitle',
                                            type:'string',
                                            validation: Rule=>Rule.required().max(25).warning("Title must be 80 characters long...")
                                        }),
                                        defineField({
                                            name:'headingDescription',
                                            title:'headingDescription',
                                            type:'string',
                                            validation: Rule=>Rule.required().max(120).warning("Description must be 400 characters long...")
                                        })
                                    ],
                                })
                            ],
                            validation: Rule=>Rule.required().max(1)
                                               
                        }),
                        defineField({
                            name:'mainDescription',
                            title:'MainDescription',
                            type:'text',
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
                            name:'mainComment',
                            title:'MainComment',
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
