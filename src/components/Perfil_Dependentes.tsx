import { DependentesType } from "../assets/types/type"
import FixName from "../helpers/FixName"


interface DependentesPropsType {
    item: DependentesType
}

export const Perfil_Dependentes = ({ item }: DependentesPropsType) => {

    return (
        <tr className="odd">
            <td className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                <div className="d-flex align-items-center gap-3 ">
                    <div className="symbol symbol-circle symbol-50px overflow-hidden">
                        <div className="symbol-label">
                            <img src={item?.url} alt={item?.nome} className="w-auto h-100" />
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="text-gray-800">{FixName(item?.nome)}</div>
                        <span>{item?.email}</span>
                    </div>
                </div>
                <div className="h-100 border-start ps-3">
                    <div className="text-gray-800 mb-1">Matrículas Ativas:</div>
                    <div className="d-flex flex-column flex-md-row gap-5">
                        {item.cursos.map((i, k)=>(
                            <span>{i.nome}</span>
                        ))}
                    </div>
                </div>
            </td>
        </tr>                         
    )
}