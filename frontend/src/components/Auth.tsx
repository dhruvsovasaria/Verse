import { Link } from "react-router-dom";
import { useState } from "react";
// import { ChangeEvent } from "react";
import { signupInput } from "@dhruvsovasaria/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<signupInput>({
    username: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      console.log(response);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log("error while signing up ");
      alert("error while signing up " + e);
    }
  }
  return (
    <div className="h-screen flex-col flex justify-center items-center text-center">
      {JSON.stringify(postInputs)}
      <div className="max-w-md">
        <div className="text-3xl font-bold px-10">Create an account</div>
        <div className="font-semibold text-slate-500">
          {type === "signin"
            ? "Create a new account ?"
            : "Already have an account ?"}
          <span className="pl-1 hover:underline">
            <Link to={type === "signin" ? "/signup" : "/signin"}>
              {type === "signin" ? "Signup" : "Login"}
            </Link>
          </span>
        </div>
        <div className="input-box">
          {type === "signup" ? (
            <LabeledInput
              label="Name"
              placeholder="Dhruv Sovasaria"
              onChange={(e) => {
                setPostInputs((c) => {
                  return { ...c, name: e.target.value };
                });
              }}
            />
          ) : null}
          <LabeledInput
            label="Username"
            placeholder="dhruvxyz@gmail.com"
            onChange={(e) => {
              setPostInputs((c) => {
                return { ...c, username: e.target.value };
              });
            }}
          />
          <LabeledInput
            type="password"
            label="Password"
            placeholder="••••••••"
            onChange={(e) => {
              setPostInputs((c) => {
                return { ...c, password: e.target.value };
              });
            }}
          />
          <div className="button">
            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-8 w-full "
            >
              {type == "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// export  Auth;

interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabeledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInputProps) => {
  return (
    <div>
      <label className="block mb-1 text-sm  font-semibold text-gray-900 text-left pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-blue-500 text-gray-900 text-sm font-normal  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:font-semibold"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
