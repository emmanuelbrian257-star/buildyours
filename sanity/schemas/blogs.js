export default{
    name:'Blogs',
    title:'Blogs',
    type:'document',
    fields:[
        {
            name:'BlogTitle',
            title:'blogTitle',
            type:'string',
            validation:Rule=>Rule.required()
        }
    ]
}
