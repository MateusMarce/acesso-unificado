import { useField } from "formik";
import MaskedInput from "react-text-mask";

export default function DataField(props: any) {
    const [field] = useField(props.name);
    
    return (
      <>
          <MaskedInput autoFocus={props.autoFocus} showMask={false} guide={false} mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} {...field} {...props} />
      </>
    );
}