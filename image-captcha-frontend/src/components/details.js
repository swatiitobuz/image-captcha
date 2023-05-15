import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Details = () => {
  const captchaRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    const inputVal = await e.target[0].value;
    captchaRef.current.reset();

    await axios
      .post(inputVal, token)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  };
  const [captchaToken, setCaptchaToken] = useState(null);
  const verify = () => {
    console.log("hi");
    captchaRef.current.getResponse().then((res) => {
      console.log(res);
      setCaptchaToken(res);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Email</label>
      <input type="text" id="name" className="input" />
      <label htmlFor="name">Password</label>
      <input type="text" id="name" className="input" />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        ref={captchaRef}
        onChange={verify}
      />
      <button>Submit</button>
    </form>
  );
};

export default Details;
