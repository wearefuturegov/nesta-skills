import React from 'react';
import { Button } from '../../components/Button';
import * as ROUTES from '../../constants/routes';
import { ButtonSecondary } from '../../components/ButtonSecondary';


const PrivacyPage = () => {
  return(
    <>
    <section>
      <ButtonSecondary to={ROUTES.LANDING}>Return home</ButtonSecondary>
      <h1>Privacy Policy</h1>

      <p>This website has been created by FutureGov in collaboration with Nesta, and our full details are below. This privacy policy explains how we use the personal information we collect via this site, as well as what cookies we use.</p>

      <ol>
        <li>
          <p><strong>What kind of information do we collect?</strong></p>
          <p>If you complete a skills assessment, we ask you for personal details such as your name, email address and information about your employment in addition to your responses throughout the assessment process. We may also record your activity and preferences when visiting the site (see "Cookies", below).</p>
        </li>
        <li>
          <p><strong>What do we do with the information we collect?</strong></p>
          <p>We will use your personal information to process your results. We may also use your information to carry out analysis and research to improve our services and also contact you to gather feedback on your experiences using the website. Please get consent first before giving us anyone else’s information.</p>
        </li>
        <li>
          <p><strong>How to unsubscribe</strong></p>
          <p>If you no longer want to receive communications from us, please contact us at hello@wearefuturegov.com.</p>
        </li>
        <li>
          <p><strong>Who else has access to your information?</strong></p>
          <p>We may share your information with our partners and with companies who help us to operate this site and to organise events and other activities.</p>     
          <p>We may disclose your personal information if required by law, or to protect or defend ourselves or others against illegal or harmful activities, or as part of a reorganisation or restructuring.</p>
        </li>
        <li>
          <p><strong>replace</strong></p>
          <p>This site contains cookies. Cookies are small text files that are placed on your computer by websites you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to site owners. Most web browsers allow some control of most cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.aboutcookies.org or www.allaboutcookies.org.</p>

          <p>This site uses cookies that are strictly necessary to enable you to move around the site or to provide certain basic features, such as logging into secure areas.</p>

          <p>The site also uses performance cookies which collect information about how you use the site, such as how you are referred to it and how long you stay on certain pages. This information is aggregated and therefore anonymous and is only used to improve the performance of the site. Some of these performance cookies are Google Analytics web cookies. To opt out of being tracked by Google Analytics across all websites visit http://tools.google.com/dlpage/gaoptout.</p>
        </li>
        <li>
          <p><strong>Security</strong></p>
          <p>We take steps to protect your personal information and follow procedures designed to minimise unauthorised access or disclosure of your information. However, we can’t guarantee to eliminate all risk of misuse.</p>
        </li>
        <li>
          <p><strong>Contacting us</strong></p>
          <p>You are legally entitled to know what personal information we hold about you and how that information is processed. If you would like to know what information we hold about you, please write to FutureGov, 2nd Floor RunwayEast 20, St Thomas St, London SE1 9RG. We will ask you for proof of identity and may charge a £10 fee.</p>
        </li>
      </ol>
      <p>FutureGov is a company limited by guarantee registered in England with company number 6472420. Registered office: 3 King Street, Halstead, England, C09 3ER.</p>
    </section>
    </>
  )
}


export default PrivacyPage;
