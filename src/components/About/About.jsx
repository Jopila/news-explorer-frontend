import authorPhoto from '../../images/author.jpg';
import './About.css';

function About() {
  return (
    <section id="about" className="about">
      <img className="about__image" src={authorPhoto} alt="Foto do autor" />
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Meu nome é Marcelo Marangoni e sou desenvolvedor full-stack formado pelo bootcamp de Desenvolvimento Web da TripleTen. Trabalho com JavaScript moderno, React, Node.js, Express e MongoDB, criando aplicações web focadas em experiência do usuário, performance e código limpo.
        </p>
        <p className="about__text">
          Venho de uma transição de carreira — atuei por anos na área de gestão de condomínios e sou formado em Direito — e trouxe dessa trajetória uma visão forte de organização, responsabilidade e foco em resolver problemas reais de pessoas e empresas. No projeto final, reúno tudo o que aprendi ao longo do curso para entregar uma aplicação completa, pronta para evoluir e ajudar potenciais clientes nos seus desafios digitais.
        </p>
      </div>
    </section>
  );
}

export default About;
