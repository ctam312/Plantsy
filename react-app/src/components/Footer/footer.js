import './footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="about">About the Devs</div>
      <div className="coders">
        <div className='col'>
          <div>Austin Lam-Tran</div>
          <a href='https://github.com/lamtran415' target='_blank'>GitHub</a>
          <a href='https://www.linkedin.com/in/austin-lam-tran-93881a155/' target='_blank'>LinkedIn</a>
        </div>
        <div className='col'>
          <div>Christian Tam</div>
          <a href='https://github.com/ctam312' target='_blank'>GitHub</a>
          <a href='https://www.linkedin.com/in/ctam312' target='_blank'>LinkedIn</a>
        </div>
        <div className='col'>
          <div>Tiana Huynh</div>
          <a href='https://github.com/thuynh789' target='_blank'>GitHub</a>
          <a href='https://www.linkedin.com/in/tiana-huynh-58b296168' target='_blank'>LinkedIn</a>
        </div>
        <div className='col'>
          <div>Jared Hem</div>
          <a href='https://github.com/JvredH' target='_blank'>GitHub</a>
          <a href='https://www.linkedin.com/in/jared-hem/' target='_blank'>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
