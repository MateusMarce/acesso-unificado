import { Email } from "@smastrom/react-email-autocomplete";
import { Field, useField } from "formik";
import { useCookies } from "react-cookie";

export default function EmailField(props: any) {
    const [cookie] = useCookies(['theme'])
    const [field] = useField(props.name);
    const baseList = [
        'satc.edu.br',
        'gmail.com',
        'hotmail.com',
        'outlook.com',
    ]
    const myClassNames = {
        dropdown: 'dropdown-menu d-block w-100 top-100 position-absolute shadow-md',
        suggestion: `my-suggestion`,
        username: 'w-auto pe-0 text-gray-700',
        domain: 'ps-0 fw-bold text-gray-900'
      };
    
    return (
        <Email
            classNames={{...myClassNames, 
                wrapper:`btn-group w-100 position-relative ${props.errors && props.touched ? 'is-invalid' : ''}`,
                input: `form-control bg-transparent ${props.errors && props.touched ? 'is-invalid' : ''}`
            }}
            placement={'bottom'}
            baseList={baseList}
            refineList={baseList}
            placeholder={props.placeholder}
            // onChange={(newValue:string)=>props.setFieldValue('user', newValue)} // or (newValue) => customSetter(newValue)
            // value={props.values.user}
            {...field}
            {...props}
        />
    );
}