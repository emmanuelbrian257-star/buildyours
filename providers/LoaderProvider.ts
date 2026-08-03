import {createContext} from "react"

type LoaderContextProps={
    isLoading: boolean;
    start:()=>void;
    stop:()=>void;
}

export const LoaderContext=createContext<LoaderContextProps>({} as LoaderContextProps)