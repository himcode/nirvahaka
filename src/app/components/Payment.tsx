"use client"
import Script from 'next/script';
import React, { useState } from 'react'

declare global {
    interface Window {
      Razorpay: any;
    }
  }
const Payment = () => {

    const [amount, setamount] = useState("50000")
  const payment = async (amount:string)=>{
    let result;
    try {
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({amount}),
      });
  
      result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(result.order)
    const options = {
      key: "rzp_test_gKANZdsNdLqaQs", // Enter the Key ID generated from the Dashboard
      amount: result.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw08o6dVr-XKrVEDl9yOew-Y&ust=1710934362330000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIDjzaidgIUDFQAAAAAdAAAAABAE",
      order_id: result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:3000/api/updateTier",
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
  };
  console.log(window)
  var rzp1 = new window.Razorpay(options);
      rzp1.open();

  }

  return (
    <div>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <input type="text" onChange={(e)=>setamount(e.target.value)} />
       <button onClick={()=>payment(amount)}>PAY</button>
    </div>
  )
}

export default Payment