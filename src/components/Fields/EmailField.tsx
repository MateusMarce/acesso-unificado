import { Email } from "@smastrom/react-email-autocomplete";
import { useField } from "formik";

export default function EmailField(props: any) {
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
        domain: 'ps-0 fw-bold text-gray-700'
      };
    
    return (
        <Email
            classNames={{...myClassNames, 
                wrapper:`btn-group w-100 position-relative ${props.errors && props.touched ? 'is-invalid' : ''}`,
                input: `form-control form-control-lg bg-transparent ${props.errors && props.touched ? 'is-invalid' : ''}`
            }}
            placement={'bottom'}
            baseList={baseList}
            refineList={baseList}
            placeholder={props.placeholder}
            {...field}
            {...props}
        />
    );
}