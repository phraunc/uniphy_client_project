import React from 'react';
import '../AboutPage/AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="containerForAbout">
      <div>
        <ul>
          <h3>Our Team:</h3>
          <li>Samantha Marlow</li>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/samantha-c-marlowe/">https://www.linkedin.com/in/samantha-c-marlowe/</a></p>
          <p>Github: <a href="https://github.com/sam4class">https://github.com/sam4class</a></p>
          <li>Anthony Cole</li>
          <p>LinkedIn: </p>
          <p>Github: </p>
          <li>Adam Shepard</li>
          <p>LinkedIn: </p>
          <p>Github: </p>
          <li>Steven Gangl</li>
          <p>LinkedIn: </p>
          <p>Github: </p>
          <li>Trent Osterman</li>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/trent-osterman-8a4365192/">https://www.linkedin.com/in/trent-osterman-8a4365192/</a></p>
          <p>Github: <a href="https://github.com/James5251996">https://github.com/James5251996</a></p>
        </ul>
        <ul>
          <h3>Technologies Used:</h3>
          <li>React</li>
          <li>Redux</li>
          <li>Saga</li>
          <li>Material UI</li>
          <li>JavaScript</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
