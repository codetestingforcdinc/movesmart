"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSync } from "react-icons/fa";

export default function HomePage() {
  const [fitnessGoal, setFitnessGoal] = useState("Maintain Weight");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [diet, setDiet] = useState("Vegan");
  const [health, setHealth] = useState("");
  const [response, setResponse] = useState("");

  const refreshPage = () => {
    setFitnessGoal("Maintain Weight");
    setAge("");
    setGender("");
    setWeight("");
    setDiet("Vegan");
    setHealth("");
    setResponse("");
  };

  // ⭐ REACT VERSION of your project.js logic
  const getRecommendations = async () => {
    const userMessage = `I'm a pure ${diet} wanting to ${fitnessGoal} of age ${age} weighing ${weight} kgs and of gender ${gender}. ${health}. Give me the perfect diet plan, tailored workout suggestions, nutritional advice, and progress tracking according to my gender, weight, age, diet, fitness goal and especially health condition. (dont send any message related to health condition if not specified and no unhealthy foods. and also fish is not considered vegetarian)`;

    setResponse("Loading... Just a second...");

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage }),
      });

      const data = await res.json();
      setResponse(data.reply || "No response");
    } catch (error: any) {
      setResponse("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins] p-6 relative">
      {/* Go Back Button */}
      <Link href="/">
        <button className="p-3 bg-gray-200 rounded-full shadow absolute top-5 left-5">
          <FaArrowLeft />
        </button>
      </Link>

      <div className="flex justify-center items-center mt-20">
        <div className="fitness-form bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Get Your Personalized Plan
          </h2>

          <label>Fitness Goal:</label>
          <select
            className="input"
            value={fitnessGoal}
            onChange={(e) => setFitnessGoal(e.target.value)}
          >
            <option>Maintain Weight</option>
            <option>Gain Muscles</option>
            <option>Weight Loss</option>
          </select>

          <label>Age:</label>
          <input
            type="number"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label>Gender:</label>
          <input
            type="text"
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label>Weight:</label>
          <input
            type="number"
            className="input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Diet:</label>
          <select
            className="input"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option>Vegan</option>
            <option>Vegetarian</option>
            <option>Eggetarian</option>
            <option>Non Vegetarian</option>
          </select>

          <label>Health Conditions:</label>
          <input
            type="text"
            className="input"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />

          <button
            className="w-full bg-black text-white py-2 rounded mt-4"
            onClick={getRecommendations}
          >
            Get Recommendations
          </button>



{response && (
  <div id="response" className="response-box">
    <pre className="whitespace-pre-wrap leading-7 text-black text-[16px] font-medium">
      {response}
    </pre>
  </div>
)}




        </div>
      </div>

      <button
        onClick={refreshPage}
        className="p-3 bg-gray-200 rounded-full shadow fixed bottom-6 right-6"
      >
        <FaSync />
      </button>
    </div>
  );
}
