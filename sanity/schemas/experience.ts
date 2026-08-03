import {defineField, defineType, defineArrayMember} from 'sanity'


export default defineType({
    name:'experience',
    title:'Experience',
    type:'document',
    icon:'E',
    fields:[
        defineField({
            name:'card',
            title:'ExperienceCard',
            type:'array',
            validation:Rule=>Rule.required().min(1),
            of:[
                {
                    name:'carditem',
                    title:'CardItem',
                    type:'object',
                    fields:[
                        defineField({
                            name:'cardImage',
                            title:'CardImage',
                            type:'image',
                            validation:Rule=>Rule.required()
                        }),
                         defineField({
                            name:'title',
                            title:'Title',
                            type:'string',
                            validation: Rule=>Rule.required()
                        }),
                        defineField({
                            name:'subtitle',
                            title:'SubTitle',
                            type:'string',
                            validation: Rule=>Rule.required()
                        }),
                         defineField({
                            name:'cardTitle',
                            title:'CardTitle',
                            type:'array',
                            of:[
                                defineArrayMember({
                                    name:'cardDescription',
                                    title:'cardDescription',
                                    type:'string',
                                    validation:Rule=>Rule.required().min(10)
                                })
                            ]
                        }),
                        defineField({
                            name:'createdAt',
                            title:'CreatedAt',
                            type:'date',
                            options:{
                                dateFormat:'YYYY-MM-DD'
                            },
                            initialValue:()=>new Date().toISOString()
                        })
                    ]
                }
            ]
        }),
       
    ]
})