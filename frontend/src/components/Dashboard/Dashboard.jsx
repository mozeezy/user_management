import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";

const Dashboard = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }


  const handleLogout = async () => {
    try {
      const response = axios.post("http://127.0.0.1:8000/api/logout/");
      console.log("Success", response);
      localStorage.removeItem("profile");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    navigate("/")
  }

  return (
    <Card>
      <h1>Hello, {profile.user_data.username}</h1>
      <p>
        <b>First Name:</b> {profile.user_data.first_name}
      </p>
      <p>
        <b>Last Name:</b> {profile.user_data.last_name}
      </p>
      <p>
        <b>Email: </b>
        {profile.user_data.email}
      </p>
      <p>
        <b>Phone Number:</b> {formatPhoneNumber(profile.user_data.phone_number)}
      </p>
      <button
        onClick={handleLogout}
        type="submit"
        className="btn btn-outline-info"
      >
        Logout
      </button>
    </Card>
  );
};

export default Dashboard;
