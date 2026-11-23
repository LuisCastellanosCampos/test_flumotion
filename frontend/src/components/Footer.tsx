export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="https://www.flumotion.com/" target="_blank" rel="noreferrer">
          <img src="/logo_horizontal.png" alt="Flumotion" className="footer-logo" />
        </a>
        <p className="footer-description">
          Tecnología de streaming profesional para broadcasters, plataformas OTT y empresas de medios que necesitan infraestructuras de vídeo escalables, seguras y adaptadas a cada proyecto.
        </p>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">Copyright 2026 © FLUMOTION SERVICIOS SA</span>
        <div className="footer-socials">
          <a href="https://www.facebook.com/flumotion/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <img src="/Fb.svg" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/flumotion" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/linkedin-logo.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
}
