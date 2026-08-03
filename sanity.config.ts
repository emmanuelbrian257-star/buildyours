import {defineConfig} from "sanity"
import {deskTool} from "sanity/desk"
import { schemaTypes } from "./sanity/schemas/index"

export default defineConfig({
    name:'build-yours-cms',
    title:'Build-yours-application',
    projectId:"56y0sr7e",
    dataset:'production',
    basePath:'/studio',
    plugins:[deskTool()],
    schema:{
        types:schemaTypes
    }
})