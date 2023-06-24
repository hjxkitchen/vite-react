import React, { Fragment, useContext, useState } from "react";
import Navbar from "../../Navbar";
import PublicNavbar from "../../PublicNavbar";
// import { UserContext } from "../../../../../index";

function Component() {
  // const user = useContext(UserContext);

  const [step1, setStep1] = useState(true);
  const [home, setHome] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  return (
    <Fragment>
      <div>
        <h1 className="text-center mt-5">Guided Sales</h1>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            {step1 && (
              <div className="card">
                <div className="card-body">
                  Hello. I am a guided sales component.
                  <br></br>
                  Welcome to Zahab!
                  <br></br>
                  What Brings you to Zahab?
                  <br></br>
                  Im looking for an Energy Solution for my:
                  <br></br>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep1(false);
                      setHome(true);
                    }}
                  >
                    Home
                  </button>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep1(false);
                    }}
                  >
                    Business
                  </button>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep1(false);
                    }}
                  >
                    Farm
                  </button>
                </div>
              </div>
            )}
            {home && (
              <div className="card">
                <div className="card-body">
                  Lets give you an energy solution for your home.
                  <br></br>
                  First, we need to figure out what your energy needs are.
                  <br></br>
                  You can either use our calculator or input the number.
                  <br></br>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary mr-3 mt-4"
                      onClick={() => {
                        setStep4(true);
                      }}
                    >
                      Use Calculator
                    </button>
                    {/* INPUT NUBMER */}
                    <input type="number" className=" mt-4" />
                    <button
                      className="btn btn-primary ml-3 mt-4"
                      onClick={() => {
                        setHome(false);
                        setStep3(true);
                      }}
                    >
                      Next
                    </button>
                    <br></br>
                  </div>
                </div>
              </div>
            )}
            {step3 && (
              <div className="card">
                <div className="card-body">
                  Great! You need 1000kWh of energy per month.
                  <br></br>
                  Now, lets figure out what kind of system you are looking for.
                  <br></br>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep3(false);
                      setStep4(true);
                    }}
                  >
                    Solar
                  </button>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep3(false);
                      setStep4(true);
                    }}
                  >
                    Backup
                  </button>
                  <button
                    className="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep3(false);
                      setStep4(true);
                    }}
                  >
                    Hybrid
                  </button>
                </div>
              </div>
            )}
            {step4 && (
              <div className="card">
                <div className="card-body">
                  Great choice!
                  <br></br>
                  Now, lets customize your system.
                  <br></br>
                  {/* panel */}
                  Panel Brand:
                  <br></br>
                  {/* radios */}
                  <div className=" d-flex">
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label
                        className="form-check
                    -label"
                        for="exampleRadios1"
                      >
                        Sundar
                      </label>
                    </div>
                    <div className="form-check mt-3 ml-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label className="form-check-label" for="exampleRadios2">
                        Germany
                      </label>
                    </div>
                  </div>
                  {/* battery brand */}
                  Battery Brand:
                  <br></br>
                  {/* radios */}
                  <div className=" d-flex">
                    <div
                      className="form-check
                  mt-3"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check
                  -label"
                        for="exampleCheck1"
                      >
                        Tesla
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
