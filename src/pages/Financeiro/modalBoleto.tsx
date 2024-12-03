import { Modal, ModalProps } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { boletoType } from '../../assets/types/type'

export default function ModalBoleto(props: ModalProps) {
  const [cookies] = useCookies(['user'])
  const data:boletoType[] = props.boleto
  
  const handleDownload = async (item:boletoType) => {
    try {
        console.log('abduihsabud');
        
    //   window.open(`https://www1.satc.edu.br/nfse/index.php/Nfse/gerarNfseDownload?cpf_cnpj=${cookies.user.empresa.cnpj}&codigo=${item.i_notas}`, '_blank')
      // let res = await api.get(`/api/painel/boletos/${item.i_notas}`)
      // setBoleto(res.data)
      // setShowBoleto(true)
    } catch (error) {
      
    }
  }

  return (
    <>
          <div className='modal modal-lg'>
            <Modal
              size='xl'
              show={props.show}
              onHide={props.onHide}
              aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    NF-e
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                {data &&
                  <div className='col-sm-12 mt-3 rounded table-responsive'>
                    <table className="table table-striped table-hover align-middle table-row-dashed gy-5 dataTable no-footer">
                      <thead>
                        <tr>
                          <th scope="col">Parcela</th>
                          <th scope="col">Data de Vencimento</th>
                          <th scope="col">Valor da Nota</th>
                          <th scope="col">Data Pagamento</th>
                          <th scope="col">Valor Pago</th>
                          <th scope="col">Situação</th>
                          <th scope="col">Imprimir</th>
                        </tr>
                      </thead>
                      <tbody className="fs-6 fw-semibold text-gray-600">
                        {data.map((i, k)=>{
                            let classe = ''
                            switch (i.flag) {
                                case 'C':
                                    classe = 'danger'
                                    break;
                                case 'P':
                                    classe = 'success'
                                    break;
                                case 'A':
                                    classe = 'primary'
                                    break;
                            
                                default:
                                    break;
                            }
                          return (
                            <tr key={k} className="odd" >
                              <td className="text-gray-800">{i.parcela}</td>
                              <td className="text-gray-800">{i.dt_vcto}</td>
                              <td className="text-gray-800">R$ {i.vl_titulo.replace('.',',')}</td>
                              <td className="text-gray-800">{i.dt_pgto}</td>
                              <td className="text-gray-800">R$ {i.vl_pago.replace('.',',')}</td>
                              <td className="text-gray-800">
                                <div className={`badge badge-light-${classe}`}>{i.status}</div>
                              </td>
                              <td className="text-gray-800">
                                <button onClick={()=>handleDownload(i)} className='btn btn-sm btn-secondary'><span className='bi bi-download'></span></button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                }

                </Modal.Body>
            </Modal>
          </div>
    </>
  )
}