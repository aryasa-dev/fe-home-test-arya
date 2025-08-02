"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardProfileContent() {
  const { data, loading } = useApi<User>({
    method: "GET",
    path: "auth/profile",
    auth: true,
  });
  return (
    <div className="bg-white text-center w-full h-full pt-20 rounded-sm">
      <div className="w-[400px] max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-slate-900">User Profile</h3>

        <div className="mt-9">
          {!loading ? (
            <>
              <Avatar className="w-16 h-16 mx-auto">
                <AvatarFallback className="bg-blue-200 font-medium text-2xl text-blue-900">
                  {data?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-3 mt-6 mb-9">
                <div className="grid grid-cols-3 bg-gray-100 px-3 py-2.5 rounded-md border border-slate-200">
                  <div className="col-span-1 flex items-center justify-between">
                    <p className="font-semibold text-gray-900">Username</p>
                    <p>:</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-slate-900">{data?.username}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 bg-gray-100 px-3 py-2.5 rounded-md border border-slate-200">
                  <div className="col-span-1 flex items-center justify-between">
                    <p className="font-semibold text-gray-900">Password</p>
                    <p>:</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-slate-900">password</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 bg-gray-100 px-3 py-2.5 rounded-md border border-slate-200">
                  <div className="col-span-1 flex items-center justify-between">
                    <p className="font-semibold text-gray-900">Role</p>
                    <p>:</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-slate-900">{data?.role}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Link href={"/dashboard"}>Back to Dashboard</Link>
              </Button>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
    </div>
  );
}
