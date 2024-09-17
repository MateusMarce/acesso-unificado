import { useState } from "react"


export default function Dash_Exames(props:any) {
	const [anotacoes, setAnotacoes] = useState<string>('')
	const text = ``

    return (
		<div className="h-100 py-10 d-flex align-items-center justify-content-center">
			<div className="p-10 rounded-3 row w-50">
				<div className="mb-10"><h3 className="text-center">Exames Periódicos</h3></div>
				{/* <div className="row" dangerouslySetInnerHTML={{__html: text}}></div> */}
				<div>
					<p>Informamos a necessidade de realização de seu exame periódico.</p>
					<b>ATENDIMENTOS NA CLINIMET</b>
					<p>A partir de Setembro/2023 os atendimentos serão realizados pela CLINIMET que está localizada na Av. Rui Barbosa, n. 160, Centro Comercial Coan, Centro, Criciúma/SC (podendo adentrar na galeria também pela Rua Seis de Janeiro, n. 135), segue localização a seguir <a target="_blank" href="https://goo.gl/maps/NVZ5MLC1zBgDEuSf8">https://goo.gl/maps/NVZ5MLC1zBgDEuSf8</a></p>
					<b>IMPORTANTE!</b>
					<p>Solicitamos a sua colaboração para realização do exame periódico, evitando, assim, que o não atendimento seja reportado ao seu coordenador e o acesso aos serviços da Instituição seja bloqueado após o decurso do prazo de 30 (trinta) dias.</p>
					<p>Qualquer dúvida entre em contato pelo e-mail e telefone abaixo.</p>
					<p>Atenciosamente,</p>
					<p>Geovana P. Gambalonga Sette <br />
					Setor de Segurança do Trabalho<br />
					Ass. Benef. da Indústria Carb. de Santa Catarina - SATC<br />
					seg.periodico@satc.edu.br<br />
					Telefone (48) 3431-7674<br />
					WhatsApp (48) 3431-7502 ou pelo link <a href="https://wa.link/hhkez9" target="_blank">https://wa.link/hhkez9</a></p>
				</div>
				<textarea onChange={(t)=>setAnotacoes(t.currentTarget.value)} cols={12} maxLength={225} style={{resize:"none"}} className="form-control form-control-lg bg-transparent mb-4" placeholder="Anotações de agendamento" />
				<button type="button" onClick={()=>props.onSubmit(anotacoes)} className="btn btn-success">Agendar Exame</button>
			</div>
		</div>
	)
}