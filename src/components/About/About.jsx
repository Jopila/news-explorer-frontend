import authorPhoto from '../../images/author.jpg';
import './About.css';

function About() {
  return (
    <section id="about" className="about">
      <img className="about__image" src={authorPhoto} alt="Foto do autor" />
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Este bloco descreve o autor do projeto. Inclui uma foto ou ilustração e um breve texto
          apresentando o perfil. Use-o para dar contexto ao usuário.
        </p>
        <p className="about__text">
          Aqui você pode falar sobre sua formação, interesses ou motivações, mantendo o tom conciso e
          alinhado ao design do News Explorer.
        </p>
      </div>
    </section>
  );
}

export default About;
