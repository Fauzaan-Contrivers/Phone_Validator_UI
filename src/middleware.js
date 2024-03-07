import {  NextResponse } from "next/server";

export async function middleware(req) {
 
  const currentRoute = req.nextUrl.pathname;
  let token = req.cookies.get("token")?.value;
  let role = req.cookies.get("role")?.value;
  if(!token){
    if (currentRoute==="/" || currentRoute==="/sub-admins") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }else{
    if(currentRoute==="/sub-admins" && role!="admin"){
        console.log("yessss")
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }else if(currentRoute==="/login"){
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  
  
  return NextResponse.next();
}
