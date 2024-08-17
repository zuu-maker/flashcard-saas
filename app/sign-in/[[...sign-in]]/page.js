import React from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   Button,
// } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
// import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen flex justify-center items-center">
    <SignIn />
  </div>
  );
  // ... (component body)
}
