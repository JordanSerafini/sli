import './contactbtn.scss';

function Contact_Btn() {
  return (
    <div
      className="contact_btn"
      onClick={() => {
        window.location.href = '/contact'; 
      }}
    >
      <svg className="circle_text" viewBox="0 0 150 150">
        <defs>
          <path
            id="textPath"
            d="M 75, 75 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          />
        </defs>
        <text fill="#ffffff" fontSize="10" fontWeight="bold">
          <textPath href="#textPath" startOffset="0%">
            Être rappelé - Nous contacter - 
          </textPath>
        </text>
      </svg>
      <div className="button_center">☎</div>
    </div>
  );
}

export default Contact_Btn;
