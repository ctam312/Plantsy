import './footer.css'

const Footer = () => {
  return (
    <footer className="whole-footer-container">
      <div className="language-framework">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
          <i class="devicon-flask-original flask-icon"></i>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
          <i class="devicon-sqlalchemy-plain sql-icon"></i>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
      </div>
        <div className='my-name-footer width-name'>
            Austin Lam-Tran
        </div>
        <a href='https://github.com/lamtran415' target='_blank' rel="noreferrer">
          <i class="devicon-github-original colored"></i>
        </a>
        <a href='https://www.linkedin.com/in/austin-lam-tran-93881a155/' target='_blank' rel="noreferrer">
          <i class="devicon-linkedin-plain colored custom"></i>
        </a>
      <div className='my-name-footer'>
          Christian Tam
      </div>
      <a href='https://github.com/ctam312' target='_blank' rel="noreferrer">
        <i class="devicon-github-original colored"></i>
      </a>
      <a href='https://www.linkedin.com/in/ctam312' target='_blank' rel="noreferrer">
        <i class="devicon-linkedin-plain colored custom"></i>
      </a>
      <div className='my-name-footer'>
          Tiana Huynh
      </div>
      <a href='https://github.com/thuynh789' target='_blank' rel="noreferrer">
        <i class="devicon-github-original colored"></i>
      </a>
      <a href='https://www.linkedin.com/in/tiana-huynh-58b296168' target='_blank' rel="noreferrer">
        <i class="devicon-linkedin-plain colored custom"></i>
      </a>
      <div className='my-name-footer'>
          Jared Hem
      </div>
      <a href='https://github.com/JvredH' target='_blank' rel="noreferrer">
        <i class="devicon-github-original colored"></i>
      </a>
      <a href='https://www.linkedin.com/in/jared-hem/' target='_blank' rel="noreferrer">
        <i class="devicon-linkedin-plain colored"></i>
      </a>
    </footer>
  )
}

export default Footer;
