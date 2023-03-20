import { Field, useField } from "formik";
import MaskedInput from "react-text-mask";

export default function CpfField(props: any) {
    const [field] = useField(props.name);
    
    return (
      <>
          <MaskedInput autoFocus={props.autoFocus} showMask={false} guide={false} mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/, /\d/] } {...field} {...props} />
      </>
    );
    // return props.value.match(/[0-9]+/) ? (
    //     <MaskedInput showMask={false} guide={false} mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/, /\d/]} {...field} {...props} />
    // ) : (
    //     <Field type="text" placeholder="Email ou CPF" name="user" autoComplete='off' className={`form-control bg-transparent ${props.errors.user && props.touched.user && 'is-invalid'}`}/> 
    // )
}