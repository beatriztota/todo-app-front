import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faQuestionCircle, faBlog } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";


const Home = () => {
  return (
    <div className="home-container-home">
    <div className="hero-section-home">
          <h1>Finalmente organize seu trabalho e sua vida.</h1>
          <p>O Site gerenciador de lista de tarefas.</p>
          <Link to="/signup" className="cta-button">
            Comece agora
          </Link>
        </div>
        
        <div className="feature-section">
          <div className="feature">
            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
            <h2>Esvazie sua mente</h2>
            <p>A maneira mais rápida de tirar as tarefas da sua cabeça.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
            <h2>Foque no que é importante</h2>
            <p>Encontre a clareza mental que você tanto busca.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
            <h2>Organize o trabalho em equipe</h2>
            <p>Onde todas as tarefas podem finalmente coexistir.</p>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>Depoimentos</h2>
          <div className="testimonial">
            <p>"Este site mudou a maneira como eu organizo minhas tarefas. É simplesmente incrível!"</p>
            <p>- João Silva</p>
          </div>
          <div className="testimonial">
            <p>"Facilitou muito a gestão de tarefas no meu time. Recomendo fortemente!"</p>
            <p>- Maria Fernanda</p>
          </div>
        </div>

        <div className="faq-section">
          <h2>Perguntas Frequentes</h2>
          <div className="faq">
            <FontAwesomeIcon icon={faQuestionCircle} className="faq-icon" />
            <h3>Como posso criar uma nova tarefa?</h3>
            <p>Para criar uma nova tarefa, basta clicar no botão "Comece agora" e seguir as instruções.</p>
          </div>
          <div className="faq">
            <FontAwesomeIcon icon={faQuestionCircle} className="faq-icon" />
            <h3>Posso compartilhar minhas listas com outras pessoas?</h3>
            <p>Sim, você pode compartilhar suas listas de tarefas com membros da sua equipe.</p>
          </div>
        </div>

        <div className="blog-section">
          <h2>Nosso Blog</h2>
          <div className="blog-post">
            <FontAwesomeIcon icon={faBlog} className="blog-icon" />
            <h3>10 Dicas para Melhorar sua Produtividade</h3>
            <p>Leia nosso artigo sobre como aumentar sua produtividade utilizando nosso site.</p>
            <Link to="/blog/10-dicas-produtividade" className="read-more">Leia mais</Link>
          </div>
          <div className="blog-post">
            <FontAwesomeIcon icon={faBlog} className="blog-icon" />
            <h3>Como Organizar Tarefas em Equipe</h3>
            <p>Descubra as melhores práticas para gerenciar tarefas em equipe de forma eficaz.</p>
            <Link to="/blog/organizar-tarefas-equipe" className="read-more">Leia mais</Link>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-info">
              <h2>© 2024 Todolist. Todos os direitos reservados.</h2>
              <p>Este site é protegido por direitos autorais e leis de propriedade intelectual.</p>
            </div>
            <div className="footer-links">
              <ul>
                <li><Link to="/about">Sobre nós</Link></li>
                <li><Link to="/contact">Contato</Link></li>
                <li><Link to="/privacy-policy">Política de Privacidade</Link></li>
                <li><Link to="/terms-of-service">Termos de Serviço</Link></li>
              </ul>
            </div>
            <div className="footer-social">
              <h3>Siga-nos:</h3>
              <ul>
                <li><a href="https://facebook.com/todolist"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" /></a></li>
                <li><a href="https://X.com/todolist"><img src="https://assets-global.website-files.com/5d66bdc65e51a0d114d15891/64cebc6c19c2fe31de94c78e_X-vector-logo-download.png" alt="X" /></a></li>
                <li><a href="https://instagram.com/todolist"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="Instagram" /></a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Home;
