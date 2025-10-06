import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faBookOpen } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <div className="about-page">
      <section>
        <h2>Historia <FontAwesomeIcon icon={faBookOpen} /></h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet mauris et neque ornare interdum.
          Aenean rutrum, orci id facilisis finibus, velit eros dictum tellus, vitae accumsan felis elit eget velit.
          Suspendisse potenti. Nam euismod, neque at iaculis vestibulum, ligula erat dapibus augue, vel egestas
          massa arcu non justo. Integer efficitur lorem sed arcu vulputate, ac consectetur arcu convallis.
        </p>
        <p>
          Phasellus luctus, nunc ut luctus dapibus, mauris mauris fringilla est, a pharetra erat lorem eget mauris.
          Integer venenatis, odio vel convallis facilisis, risus enim malesuada libero, nec laoreet risus nisi eget
          massa.
        </p>
      </section>

      <section>
        <h2>Logros <FontAwesomeIcon icon={faAward} />
        </h2>
        <ul>
          <li>40 adultos mayores a quienes se les brinda atención 24 horas al día.</li>
          <li>5 tiempos de alimentación diarios para los 40 adultos mayores residentes en el hogar.</li>
          <li>24 horas de actividades recreativas y de esparcimiento para los adultos mayores.</li>
          <li>12 actividades recreativas y de esparcimiento para los adultos mayores.</li>
          <li>624 consultas médicas a lo interno.</li>
        </ul>
      </section>
    </div>
  )
}