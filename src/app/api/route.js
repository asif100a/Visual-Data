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

export const updateStudent = async({id, newData}) => {
    console.log(id);
    console.log(newData);
    const response = await supabase.from('Students').update(newData).eq('id', id);
    return response;
};

export const deleteStudent = async({studentId}) => {
    console.log(studentId);
    const response = await supabase.from('Students').delete().eq('id', studentId);
    return response;
};