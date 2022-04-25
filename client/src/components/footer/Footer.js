import {Container} from "react-bootstrap";
import styles from './footer.module.css';
import {HOME_ROUTE} from "../../utils/consts";
import {Link} from "react-router-dom";

const Footer = () => {
  async function vkAuthenticate() {
    const response = await fetch('http://localhost:3000/api/oauth/vkontakte', {
      method: 'GET'
    });
    const data = await response.json();
    window.location.href = data.location;
  }
  return (
    <div className={styles.section}>
      <Container className='d-flex flex-column align-items-center'>
        <Link to={HOME_ROUTE} className={styles.brand}>DigitalTech</Link>
        <div className={styles.address}>77 Freestone, Largepoint, London, 777777</div>
        <div>
          <a className={styles.phone} href='tel:(777) 777-7777'>(777) 777-7777</a>
          <a className={styles.email} href="mailto:mail@digitaltech.com">mail@digitaltech.com</a>
          <div onClick={vkAuthenticate}>VK</div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
