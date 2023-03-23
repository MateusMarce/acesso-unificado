import { useField } from "formik";
import MaskedInput from "react-text-mask";


export default function FoneField(props: any) {
    const [field] = useField(props.name);
    
    return <MaskedInput keepCharPositions mask={['(',/\d/, /\d/, ')', ' ' , /\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/]} {...field} {...props} />
}