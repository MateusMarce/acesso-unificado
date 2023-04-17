import { useEffect, useState } from 'react';

import AsyncSelect from 'react-select/async';
import api from '../../services/api';

type CursoType = {
    value:string
    label:string
}

export default (props:any) => {
    const [vagas, setVagas] = useState([])

    const Areas = async (value:string) => {
        try {
            if(props.id_nivel && value){
                let res = await api.get(`alumni/getCursos/${value}/${props.id_nivel}`)
                // setVagas(res.data)
                let list:any = []
                res.data.map((i:any)=>{
                    list.push({value: i.i_curso, label:i.nome})
                })
                return list
            }    
        } catch (error) {
            
        }
    }

    

    const promiseOptions = (inputValue: string) =>
        new Promise<CursoType[]>((resolve) => {
            setTimeout(() => {
                resolve(Areas(inputValue));
                
            }, 1000);
    });

    const colourStyles = {
        control: (styles:any) => ({ ...styles, backgroundColor: 'white', height:'100%', borderRadius:'0.625rem', padding:'0.825rem 1.5rem', fontSize:'1.15rem', color:'var(--kt-form-select-color)' }),
        option: (styles:any, { data, isDisabled, isFocused, isSelected, isHover }:any) => {
          return {
            ...styles,
            backgroundColor:isFocused ? '#f1f6fb' : 'white',
            padding:'5px',
            color: 'black',
            cursor: isDisabled ? 'not-allowed' : 'default'
          };
        },
        menu: (styles:any) => ({
          ...styles, 
          boxShadow: '0 .5rem 2rem rgba(0, 10, 36, 0.158)!important',
          marginTop: 10,
          borderRadius:'0.375rem',
          overflow:'hidden',
          left:0
        }),
        menuList: (styles:any) => ({
          ...styles,
          backgroundColor: 'white',
          padding:5
        }),

    };

    let list:any = []
    if(props.list) {
        props.list.map((i:any)=>{
            list.push({value:i.i_curso, label:i.nome_curso})
        })
    }
    
    return (
        <AsyncSelect
            name="curso"
            className={''}
            defaultValue={{value:props.defaultValue.i_curso, label:props.defaultValue.nome}}
            loadOptions={promiseOptions}
            unstyled
            styles={colourStyles}
            defaultOptions={list}
            cacheOptions
            placeholder='Curso'
            onChange={(e)=>props.setValue('curso', e?.value)}
            onBlur={()=>{props.touched('curso'), props.setError('curso', 'Preencha o campo')}}
        />
    )
}
