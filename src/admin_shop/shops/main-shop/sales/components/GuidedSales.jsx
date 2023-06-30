import React, { Fragment, useContext, useState } from "react";
// import Navbar from "../../../system/Navbar";
// import PublicNavbar from "../../PublicNavbar";
import { UserContext } from "../../../../../App";

function Component() {
  const user = useContext(UserContext);

  const [step1, setStep1] = useState(true);
  const [home, setHome] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  return (
    <Fragment>
      <div>
        <h1 class="text-center mt-5">Guided Sales</h1>
      </div>
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            {step1 && (
              <div class="card">
                <div class="card-body">
                  Hello. I am a guided sales component.
                  <br></br>
                  Welcome to Zahab!
                  <br></br>
                  What Brings you to Zahab?
                  <br></br>
                  Im looking for an Energy Solution for my:
                  <br></br>
                  <button
                    class="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep1(false);
                      setHome(true);
                    }}
                  >
                    Home
                  </button>
                  <button
                    class="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep1(false);
                    }}
                  >
                    Business
                  </button>
                  <button
                    class="btn btn-primary mr-3 mt-4"
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
              <div class="card">
                <div class="card-body">
                  Lets give you an energy solution for your home.
                  <br></br>
                  First, we need to figure out what your energy needs are.
                  <br></br>
                  You can either use our calculator or input the number.
                  <br></br>
                  <div class="d-flex">
                    <button
                      class="btn btn-primary mr-3 mt-4"
                      onClick={() => {
                        setStep4(true);
                      }}
                    >
                      Use Calculator
                    </button>
                    {/* INPUT NUBMER */}
                    <input type="number" class=" mt-4" />
                    <button
                      class="btn btn-primary ml-3 mt-4"
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
              <div class="card">
                <div class="card-body">
                  Great! You need 1000kWh of energy per month.
                  <br></br>
                  Now, lets figure out what kind of system you are looking for.
                  <br></br>
                  <button
                    class="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep3(false);
                      setStep4(true);
                    }}
                  >
                    Solar
                  </button>
                  <button
                    class="btn btn-primary mr-3 mt-4"
                    onClick={() => {
                      setStep3(false);
                      setStep4(true);
                    }}
                  >
                    Backup
                  </button>
                  <button
                    class="btn btn-primary mr-3 mt-4"
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
              <div class="card">
                <div class="card-body">
                  Great choice!
                  <br></br>
                  Now, lets customize your system.
                  <br></br>
                  {/* panel */}
                  Panel Brand:
                  <br></br>
                  {/* radios */}
                  <div class=" d-flex">
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label
                        class="form-check
                    -label"
                        for="exampleRadios1"
                      >
                        Sundar
                      </label>
                    </div>
                    <div class="form-check mt-3 ml-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label class="form-check-label" for="exampleRadios2">
                        Germany
                      </label>
                    </div>
                  </div>
                  {/* battery brand */}
                  Battery Brand:
                  <br></br>
                  {/* radios */}
                  <div class=" d-flex">
                    <div
                      class="form-check
                  mt-3"
                    >
                      <input
                        type="radio"
                        class="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        class="form-check
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
