export default function Dash_HeaderSecondary() {


    return (
        <div className="app-header-secondary">
            <div className="app-container container-xxl d-flex align-items-stretch">
                <div className="w-100 d-flex flex-stack">
                    <div className="d-flex flex-stack me-5">
                        <span className="text-white fw-bold fs-5 me-3 me-lg-6">Canais:</span>
                        <div className="d-flex gap-1 gap-lg-2">
                            <a href="ramais.php" className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center">
                                <img src="assets/media/svg/brand-logos/fone-icon.svg" className="w-20px" alt="" />
                                <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Ramais</span>
                            </a>
                            <a href="#" className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center">
                                <img src="assets/media/svg/brand-logos/email-icon.svg" className="w-20px" alt="" />
                                <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">E-mail</span>
                            </a>
                            <a href="#" className="custom-link rounded px-lg-4 py-lg-2 d-flex flex-center">
                                <img src="assets/media/svg/brand-logos/msn-icon.svg" className="w-20px" alt="" />
                                <span className="d-none d-lg-inline text-gray-600 fw-bold text-hover-primary fs-5 ps-3">Chat online</span>
                            </a>
                        </div>
                    </div>
                    <div className="d-flex flex-stack">
                        <a href="#" className="buti buticolor_1"><img src="assets/media/svg/brand-logos/nercu-icon.svg" alt="" /></a>
                        <a href="#" className="buti buticolor_1"><img src="assets/media/svg/brand-logos/treinas-icon.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}