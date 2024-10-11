import { supabase } from "../(lib)/helper/superbase";

export const getStudent = async() => {
    const {data, error} = await supabase.from("Students").select("*");
    if(error) {
        console.log(error)
    }
    
    return data;
};

export const insertStudent = async({data}) => {
    console.log(data)
    const response = await supabase.from('Students').insert([
        {...data}
    ]);
    return response;
};