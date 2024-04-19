"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const provider = new GithubAuthProvider();
provider.addScope('repo')
const firebaseConfig = {
  apiKey: "AIzaSyDz_x22m7vDU9RrE7KHXH_1rBINGK4XbTY",
  authDomain: "devware-b01ed.firebaseapp.com",
  projectId: "devware-b01ed",
  storageBucket: "devware-b01ed.appspot.com",
  messagingSenderId: "363045197813",
  appId: "1:363045197813:web:4cc581110467a1132cb2bc",
  measurementId: "G-K30WJG12BQ"
};

const app = initializeApp(firebaseConfig);
const prov = new GithubAuthProvider();


const SignupPage = () => {
  const navigator = useRouter();

  const handleGitLogin = async () => {
    const auth = getAuth();
  signInWithPopup(auth, provider)
  .then(async (result) => {
    console.log(result.user.reloadUserInfo)
    const credential = GithubAuthProvider.credentialFromResult(result);
    const {displayName, email, screenName } = result.user.reloadUserInfo;
   
    const userData = {
      username: screenName,
      email,
      password: `${screenName}-${email}`,
      display: displayName
    }
    try {
      console.log(userData)
      const response = await axios.post("http://localhost:3000/api/signup", userData)
      console.log(response.data)
    
      if (!response.data.success) {
        alert("User already exists with the following credentials")
      }else {
        navigator.push("/signin")
      }
    }catch(err) {
      console.log(err)
    }
  })
  .catch(err => {
    console.log('something went wrong')
  })
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  Create your account
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </h3>
                <div className="mb-8 flex items-center justify-center">
                <button type="button" onClick={() => {handleGitLogin()}} className=" dark:shadow-submit-dark flex items-center justify-center rounded-sm text-base font-medium text-white duration-300 hover:text-black">
                      Connect your Github
                    </button>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
